import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pageable<T> {
  content: Array<T>;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: PageableDetails;
  size: number;
  sort: SortDetails;
  totalElements: number;
  totalPages: number;
}

export interface SortDetails {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface PageableDetails {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: SortDetails;
  unpaged: boolean;
}

export interface SongHeadline {
  id: number;
  title: string;
  artist: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oauthService: OAuthService, private router: Router, private httpClient: HttpClient) {
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
    return 'Bearer ' + this.oauthService.getAccessToken();
  }

  public login(username: string, password: string): void {
    this.oauthService.fetchTokenUsingPasswordFlow(username, password).then((resp) => {
      console.log('Log in success');
      this.router.navigate(['/songs']);
    }).catch((err) => {
      console.log('Failed');
    });
  }

  public getSongs(): Observable<Pageable<SongHeadline>> {
    return this.httpClient.get<Pageable<SongHeadline>>('http://localhost:8080/songs', { headers: {Authorization: this.tokenHeader}});
  }
}
