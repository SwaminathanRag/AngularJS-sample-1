import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = ''
  password = ''
  invalidCredential = false
  errorMessage = 'Invalid Credential'

  constructor(private router: Router,
   private hardcodedAuthenticationService: HardcodedAuthenticationService,
   private basicAuthenticationService: BasicAuthenticationService,
   private jwtAuthenticationService: JwtAuthenticationService) {}

  handleLogin() {
    // if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
    //   this.router.navigate(['home', this.username])
    //   this.invalidCredential = false
    // } else {
    //   this.invalidCredential = true
    // }
    //this.basicAuthenticationService.authenticate(this.username, this.password).subscribe(response => {
    //    console.log('Successful')
    //    this.router.navigate(['home', this.username])
    //    this.invalidCredential = false
    //  },
    //  error => {
    //    console.log('error' + error)
    //    this.invalidCredential = true
    //  }
    //)
    this.jwtAuthenticationService.authenticate(this.username, this.password).subscribe({next: response => {
      console.log('Successful')
      this.router.navigate(['home', this.username])
      this.invalidCredential = false
    },
    error: error => {
      console.log('error' + error)
      this.invalidCredential = true
    }})
  }
}
