import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { SongsComponent } from './songs/songs.component';
import { PlayComponent } from './play/play.component';
import { SignupComponent } from './signup/signup.component';
import { BatchSignupComponent } from './batch-signup/batch-signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PromoteComponent } from './promote/promote.component';
import { ResultsComponent } from './results/results.component';
import { AddSongComponent } from './add-song/add-song.component';
import { SearchSongComponent } from './search-song/search-song.component';
import { ViewSongsComponent } from './view-songs/view-songs.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'songs', component: SongsComponent},
  {path: 'play/:id', component: PlayComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'batch-signup', component: BatchSignupComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'promote', component: PromoteComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'searchSong', component: SearchSongComponent},
  {path: 'addSong', component: AddSongComponent},
  {path: 'viewSongs', component: ViewSongsComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
