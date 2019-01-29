import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public errorMessage: string;
  public success: boolean;

  constructor(private authService: AuthenticationService) {
    this.success = false;
  }

  public submit() {
    this.success = false;
    this.errorMessage = undefined;
    const username = (<HTMLInputElement> document.getElementById('username')).value;
    const password = (<HTMLInputElement> document.getElementById('password')).value;
    this.authService.createAccount(username, password).subscribe(_ => {
      this.success = true;
    }, error => {
      this.errorMessage = error.error.message;
    }
      );
  }

}
