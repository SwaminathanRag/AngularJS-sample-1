import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';
import { JwtAuthenticationService } from './jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private jwtAuthenticationService: JwtAuthenticationService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //if(this.hardcodedAuthenticationService.isUserLoggedIn()) {
      if(this.jwtAuthenticationService.isUserLoggedIn()) {
      return true;
    } 
    this.router.navigate(['login']);
    return false;
  }
}
