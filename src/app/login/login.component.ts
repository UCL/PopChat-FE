import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      console.log('Already logged in');
    } else {
      console.log('Need to log in');
    }
  }

  public submit(): void {
    console.log('Login!');
  }

}
