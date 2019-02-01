import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

interface UserDetails {
  username: string;
  admin: boolean;
  errorMessage?: string;
}

@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.scss']
})
export class PromoteComponent implements OnInit {

  private users: Array<UserDetails>;
  private errorMessage: string;

  constructor(private authService: AuthenticationService) {
    this.users = [];
  }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(data => {
      this.users = data;
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
    });
  }

  public toggle(user: UserDetails): void {
    this.authService.toggleAdmin(user).subscribe(_ => {
      user.admin = !user.admin;
    }, error => {
      console.log(error);
      if (error.error !== undefined) {
        if (error.error.message !== undefined) {
          user.errorMessage = error.error.message;
        } else if (error.error.error_description !== undefined) {
          user.errorMessage = error.error.error_description;
        } else if (error.error.error !== undefined) {
          user.errorMessage = error.error.error;
        } else {
          user.errorMessage = 'An unknown error has occurred';
        }
      }
    });
  }

}
