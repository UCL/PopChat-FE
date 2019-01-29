import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { SongsComponent } from './songs/songs.component';
import { PlayComponent } from './play/play.component';
import { SignupComponent } from './signup/signup.component';
import { BatchSignupComponent } from './batch-signup/batch-signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'songs', component: SongsComponent},
  {path: 'play/:id', component: PlayComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'batch-signup', component: BatchSignupComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
