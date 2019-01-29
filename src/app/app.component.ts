import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loggedIn$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.loggedIn$ = this.authService.loggedIn();
  }

  public ngOnInit() {
  }
}
