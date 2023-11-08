import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.basicAuthenticationService.getBasicHeader();
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', authToken)
    // });  
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

      return next.handle(authReq);
  }
}
