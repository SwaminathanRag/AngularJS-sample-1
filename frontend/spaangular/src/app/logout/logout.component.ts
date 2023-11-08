import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private jwtAuthenticationService: JwtAuthenticationService) {
  }
  ngOnInit(): void {
    //this.hardcodedAuthenticationService.logout();
    this.jwtAuthenticationService.logout();
  }
}
