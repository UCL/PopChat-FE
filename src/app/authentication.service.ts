import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oauthService: OAuthService, private router: Router) {
    this.oauthService.clientId = environment.oauth_id;
    this.oauthService.dummyClientSecret = environment.oauth_secret;
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenEndpoint = 'http://localhost:8080/oauth/token';
    this.oauthService.scope = 'read write trust';
    this.oauthService.useHttpBasicAuthForPasswordFlow = true;
  }

  public loggedIn(): boolean {
     return this.oauthService.hasValidAccessToken();
  }

  public logOut(): void {
    this.oauthService.logOut();
  }

  public get tokenHeader(): string {
    return 'Bearer: ' + this.oauthService.getAccessToken();
  }

  public login(username: string, password: string): void {
    this.oauthService.fetchTokenUsingPasswordFlow(username, password).then((resp) => {
      console.log('Log in success');
      this.router.navigate(['/songs']);
    }).catch((err) => {
      console.log('Failed');
    });
  }
}
// Created admin with username admin and password wispy-mode-6
//  an OAuth2 client with name: popchat-fe-client and password: proud-recipe-4