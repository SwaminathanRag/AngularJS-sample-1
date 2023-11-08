import { Component, OnInit } from '@angular/core';
import { EquitiesService, Equity } from '../service/data/equities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equities',
  templateUrl: './equities.component.html',
  styleUrls: ['./equities.component.css']
})
export class EquitiesComponent implements OnInit {

  userName ='';

  currentEquity!: Equity | null;

  //currentEquity:  any = null;

  equitiesList: Equity[] = [] ;

  message = '';

  constructor(private equitiesService: EquitiesService,
              private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.userName = this.route.snapshot.params['name']
    this.refreshEquities();
  }
  refreshEquities() {
    this.equitiesService.getEquitiesForUser(this.userName).subscribe(
      response => this.handleSuccessResponse(response),
      error => this.handleErrorResponse(error)
    );  
  }

  handleSuccessResponse(response: Equity[]): void {
    console.log(response);
    this.equitiesList = response;
  }
  
  handleErrorResponse(error: any): void {
    console.log(error);
  }
  
  updateEquity(editedEquity: Equity) {
    this.currentEquity = editedEquity;
  }

  saveEquity() {
    if(this.validateEquity()) {
      if(this.currentEquity != null && this.currentEquity.id != -1) {
        this.equitiesService.updateEquityForUser(this.userName, this.currentEquity.id, this.currentEquity)
        .subscribe(
          response => {
            this.message = `Successfully Updated Equity`;  
            this.currentEquity = null;  
            this.refreshEquities();
        });
      } else if(this.currentEquity != null && this.currentEquity.id == -1) {
        this.equitiesService.addEquityForUser(this.userName, this.currentEquity)
        .subscribe(
          response => {
            this.message = `Successfully Added Equity`;  
            this.currentEquity = null;  
            this.refreshEquities();
        });
      }
    }
  }

  deleteEquity(id: number) {
    this.equitiesService.deleteEquityForUser(this.userName, id).subscribe(
      response => {
        this.message = 'Successfully Deleted Equity';    
        this.refreshEquities();
    });
  }

  cancelEquity(id: number) {
    this.currentEquity = null;
    this.refreshEquities();
  }

  addEquity() {
    let newEquity = new Equity(-1, '', 0, 0);
    this.equitiesList.push(newEquity);
    this.currentEquity = newEquity;
  }
  validateEquity(): boolean {
    if(this.currentEquity != null) {
      if(this.currentEquity.name === '') {
        this.message = 'Please Enter Name';
        return false;
      }
      if(this.currentEquity.quantity <= 0) {
        this.message = 'Please Enter Quantity';
        return false;
      }
      if(this.currentEquity.price <= 0) {
        this.message = 'Please Enter Price';
        return false;
      }
    }
    return true;
  }
}


