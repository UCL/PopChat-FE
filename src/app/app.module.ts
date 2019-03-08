import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { SongsComponent } from './songs/songs.component';
import { SongHeadlineComponent } from './song-headline/song-headline.component';
import { PlayComponent } from './play/play.component';
import { SignupComponent } from './signup/signup.component';
import { BatchSignupComponent } from './batch-signup/batch-signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PromoteComponent } from './promote/promote.component';
import { ResultsComponent } from './results/results.component';
import { SearchSongComponent } from './search-song/search-song.component';
import { AddSongComponent } from './add-song/add-song.component';
import { ViewSongsComponent } from './view-songs/view-songs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    AdminComponent,
    SongsComponent,
    SongHeadlineComponent,
    PlayComponent,
    SignupComponent,
    BatchSignupComponent,
    ChangePasswordComponent,
    PromoteComponent,
    ResultsComponent,
    SearchSongComponent,
    AddSongComponent,
    ViewSongsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [ AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
