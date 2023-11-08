import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SERVER_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string) {    
    return this.httpClient.post<any>(`${SERVER_URL}/authenticate`, {
      username,
      password
    })
      .pipe(map(data => 
      {    
        sessionStorage.setItem('authenticatedUser', username);
        sessionStorage.setItem('basicHeader', ' Bearer ' + data.token);
        return data;
      }
    ));
  }

  getHttpAuthenticationHeader(token: string) {
    return ' Bearer ' + token;
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
