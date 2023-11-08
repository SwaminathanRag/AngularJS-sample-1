import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/app/app.constants';


@Injectable({
  providedIn: 'root'
})
export class EquitiesService {

  constructor(private httpClient: HttpClient) { }

  getEquitiesForUser(userName: String) {
    return this.httpClient.get<Equity[]>(`${SERVER_URL}/users/${userName}/equities`);
  }

  deleteEquityForUser(userName: String, id: number) {
    return this.httpClient.delete(`${SERVER_URL}/users/${userName}/equities/${id}`);
  }

  updateEquityForUser(userName: String, id: number, equity: Equity) {
    return this.httpClient.put(`${SERVER_URL}/users/${userName}/equities/${id}`, equity);
  }

  addEquityForUser(userName: String, equity: Equity) {
    return this.httpClient.post(`${SERVER_URL}/users/${userName}/equities`, equity);
  }
}

export class Equity {
  constructor(public id: number, public name: string, 
              public quantity: number, public price: number) {

  }
}
