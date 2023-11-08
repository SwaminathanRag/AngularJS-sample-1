import { Injectable } from '@angular/core';
import { JwtAuthenticationService } from './jwt-authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorJwtAuthService implements HttpInterceptor {

  constructor(private jwtAuthenticationService: JwtAuthenticationService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.jwtAuthenticationService.getBasicHeader();
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', authToken)
    // });  
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

      return next.handle(authReq);
  }
}
