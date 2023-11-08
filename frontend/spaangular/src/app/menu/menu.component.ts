import { Component } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(public hardcodedAuthenticationService: HardcodedAuthenticationService,
    public jwtAuthenticationService: JwtAuthenticationService) {

  }
}
