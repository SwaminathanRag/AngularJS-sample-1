import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(userName: string, password: string) {
    let headers = new HttpHeaders()
        .set('Authorization',  this.getHttpAuthenticationHeader(userName, password));
    
    // var options = {
    //   headers: new HttpHeaders()
    //     .set('Authorization',  this.getHttpAuthenticationHeader(userName, password))
    // }

    return this.httpClient.get("http://localhost:8080/basicAuth", {headers, responseType: 'text'})
      .pipe(map(data => 
      {    
        sessionStorage.setItem('authenticatedUser', userName);
        sessionStorage.setItem('basicHeader', this.getHttpAuthenticationHeader(userName, password));
        return data;
      }
    ));
  }

  getHttpAuthenticationHeader(userName: string, password: string) {
    return ' Basic ' + window.btoa(userName + ":" + password);
  }

  getBasicHeader(): string {
    const header = sessionStorage.getItem('basicHeader');
    if(header != null) {
      return header;
    } else {
      return '';
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('basicHeader');
  }
}
