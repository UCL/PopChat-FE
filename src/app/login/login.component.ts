import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(state => {
      if (state) {
        console.log('Already logged in');
        this.router.navigate(['/songs']);
      } else {
        console.log('Need to log in');
      }
    });
  }

  public submit(): void {
    const username = (<HTMLInputElement> document.getElementById('username')).value;
    const password = (<HTMLInputElement> document.getElementById('password')).value;
    this.authService.login(username, password);
  }

}
