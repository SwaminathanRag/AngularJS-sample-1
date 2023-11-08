import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { EquitiesComponent } from './equities/equities.component';
import { LogoutComponent } from './logout/logout.component';
import { HardcodedAuthenticationService } from './service/hardcoded-authentication.service';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home/:name', component:HomeComponent, canActivate: [RouteGuardService]},
  {path: 'equities/:name', component:EquitiesComponent, canActivate: [RouteGuardService]},
  {path: 'logout', component:LogoutComponent, canActivate: [RouteGuardService]},

  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
