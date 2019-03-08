import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

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

export interface UserPromotion {
  username: string;
  admin: boolean;
}

export interface DatabaseSong {
  id?: number;
  title?: string;
  artist?: string;
  year?: number;
  video?: string;
  lyrics?: string;
}

export interface SongValidation {
  valid: boolean;
  titleErrorMessage?: string;
  artistErrorMessage?: string;
  yearErrorMessage?: string;
  videoErrorMessage?: string;
  lyricsErrorMessage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private obs: Subject<boolean>;
  private serverRoot = 'http://localhost:8080';
  private song: DatabaseSong;

  constructor(private oauthService: OAuthService, private router: Router, private httpClient: HttpClient) {
    this.obs = new BehaviorSubject<boolean>(false);
    this.oauthService.clientId = environment.oauth_id;
    this.oauthService.dummyClientSecret = environment.oauth_secret;
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenEndpoint = this.serverRoot + '/oauth/token';
    this.oauthService.scope = 'read write trust';
    this.oauthService.useHttpBasicAuthForPasswordFlow = true;
    this.oauthService.postLogoutRedirectUri = window.location.origin;
    this.oauthService.requireHttps = false;

    this.obs.next(this.oauthService.hasValidAccessToken());

    this.clearSong();
  }

  public loggedIn(): Observable<boolean> {
    return this.obs.asObservable();
  }

  public logOut(): void {
    this.oauthService.logOut();
    this.updateLoggedIn();
  }

  public get tokenHeader(): string {
    return 'Bearer ' + this.oauthService.getAccessToken();
  }

  public login(username: string, password: string): void {
    this.oauthService.fetchTokenUsingPasswordFlow(username, password).then((resp) => {
      console.log('Log in success');
      this.router.navigate(['/songs']);
      this.updateLoggedIn();
    }).catch((err) => {
      console.log('Failed');
    });
  }

  public createAccount(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.serverRoot + '/user/signup', { username: username, password: password });
  }

  public batchCreateAccounts(prefix: string, count: number): Observable<any> {
    return this.httpClient.post<any>(this.serverRoot + '/user/batch-signup', { prefix: prefix, numUsers: count },
      { headers: { Authorization: this.tokenHeader } });
  }

  public changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.httpClient.post<any>(this.serverRoot + '/user/change-password',
      { oldPassword: oldPassword, newPassword: newPassword },
      { headers: { Authorization: this.tokenHeader } });
  }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(this.serverRoot + '/user/list', { headers: { Authorization: this.tokenHeader } });
  }

  public toggleAdmin(user: UserPromotion): Observable<any> {
    return this.httpClient.post<any>(this.serverRoot + '/user/promote',
      { username: user.username, promote: !user.admin },
      { headers: { Authorization: this.tokenHeader } });
  }

  public getSongs(): Observable<Pageable<SongHeadline>> {
    return this.httpClient.get<Pageable<SongHeadline>>(this.serverRoot + '/songs', { headers: { Authorization: this.tokenHeader } });
  }

  public getGame(id: number): Observable<any> {
    return this.httpClient.post(this.serverRoot + '/play/' + id, {}, { headers: { Authorization: this.tokenHeader } });
  }

  private updateLoggedIn(): void {
    if (this.obs !== undefined) {
      const status = this.oauthService.hasValidAccessToken();
      console.log('Service updated logged in status with: ' + status);
      this.obs.next(status);
    }
  }

  public submitAnswer(answerId: number, startTime: Date, endTime: Date): void {
    const responseBody = {
      optionId: answerId,
      startTime: startTime,
      endTime: endTime
    };
    this.httpClient.post(this.serverRoot + '/answer', responseBody,
      { headers: { Authorization: this.tokenHeader } }).subscribe(_ => console.log('Answer saved'),
        error => console.log(error));
  }

  public getResults(): Observable<any> {
    return this.httpClient.get(this.serverRoot + '/user/results', { headers: { Authorization: this.tokenHeader } });
  }

  public setSongState(title: string, artist: string, year: number, video: string, lyrics: string) {
    this.song = {
      title: title,
      artist: artist,
      year: year,
      video: video,
      lyrics: lyrics
    };
  }


  public setSong(song: DatabaseSong) {
    this.song = song;
  }

  public getSongState(): DatabaseSong {
    return Object.assign({}, this.song);
  }

  public clearSong(): void {
    this.song = {};
  }

  public isSongValid(): SongValidation {
    const validation: SongValidation = {
      valid: true
    };

    validation.titleErrorMessage = this.checkString(this.song.title);
    validation.artistErrorMessage = this.checkString(this.song.artist);
    validation.yearErrorMessage = this.checkYear(this.song.year);
    validation.videoErrorMessage = this.checkUrl(this.song.video);
    validation.lyricsErrorMessage = this.checkString(this.song.lyrics);
    validation.valid = !validation.titleErrorMessage && !validation.artistErrorMessage &&
                       !validation.yearErrorMessage && !validation.videoErrorMessage &&
                       !validation.lyricsErrorMessage;
    return validation;
  }

  private checkString(string: string): string {
    return !(string === undefined || typeof (string) !== 'string' || string.length < 1) ? undefined : 'Value must not be empty';
  }

  private checkYear(year: number): string {
    return year !== undefined && typeof (year) === 'number' && year > 1 ? undefined : 'The year must be provided';
  }

  private checkUrl(url: string): string {
    return url !== undefined && typeof (url) === 'string' && url.startsWith('https://www.youtube.com/embed/') ?
      undefined : 'Youtube URLS must start with https://www.youtube.com/embed/';
  }

  public saveSong(): Observable<SongValidation> {
    return this.httpClient.post<SongValidation>(this.serverRoot + '/setSong',
                                                this.song,
                                                { headers: { Authorization: this.tokenHeader } });
  }

  public getAllSongList(): Observable<Array<DatabaseSong>> {
    return this.httpClient.get<Array<DatabaseSong>>(this.serverRoot + '/viewSongs', { headers: { Authorization: this.tokenHeader } });
  }

  public deleteSong(song: DatabaseSong): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.serverRoot + '/song/' + song.id, { headers: { Authorization: this.tokenHeader } });
  }
}
