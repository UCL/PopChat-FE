import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public success: boolean;
  public errorMessage: string;

  constructor(private authService: AuthenticationService) {
    this.success = false;
  }

  ngOnInit() {
  }

  public submit() {
    this.success = false;
    this.errorMessage = undefined;
    const oldPassword = (<HTMLInputElement>document.getElementById('old-password')).value;
    const newPassword = (<HTMLInputElement>document.getElementById('new-password')).value;
    this.authService.changePassword(oldPassword, newPassword).subscribe(data => {
      this.success = true;
      console.log(data);
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
