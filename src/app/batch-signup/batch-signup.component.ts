import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

interface PopUser {
  username: string;
  password: string;
}

@Component({
  selector: 'app-batch-signup',
  templateUrl: './batch-signup.component.html',
  styleUrls: ['./batch-signup.component.scss']
})
export class BatchSignupComponent implements OnInit {

  public success: boolean;
  public errorMessage: string;
  public accounts: Array<PopUser>;

  constructor(private authService: AuthenticationService) {
    this.success = false;
    this.accounts = [];
  }

  ngOnInit() {
  }

  public submit() {
    this.success = false;
    this.errorMessage = undefined;
    const username = (<HTMLInputElement>document.getElementById('username-prefix')).value;
    const number = (<HTMLInputElement>document.getElementById('number')).value;
    this.authService.batchCreateAccounts(username, +number).subscribe(data => {
      this.success = true;
      console.log(data);
      this.accounts = data;
    }, error => {
      console.log(error);
      if (error.error !== undefined) {
        if (error.error.message !== undefined) {
          this.errorMessage = error.error.message;
        } else if (error.error.error_description !== undefined) {
          this.errorMessage = error.error.error_description;
        } else if (error.error.error !== undefined) {
          this.errorMessage = error.error.error;
        } else {
          this.errorMessage = 'An unknown error has occurred';
        }
      }
    }
    );
  }
}
