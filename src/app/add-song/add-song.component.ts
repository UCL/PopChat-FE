import { Component, OnInit } from '@angular/core';
import { AuthenticationService, DatabaseSong, SongValidation } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  public song: DatabaseSong;
  public errorMessage: string;
  public validation: SongValidation;
  public working: boolean;
  public successMessage: string;

  constructor(private authService: AuthenticationService) {
    this.working = false;
   }

  ngOnInit() {
    this.song = this.authService.getSongState();
  }

  public submit(): void {
    this.working = true;
    // Clear error messages before starting
    this.errorMessage = undefined;
    this.successMessage = undefined;

    const title = (<HTMLInputElement> document.getElementById('title')).value;
    const artist = (<HTMLInputElement> document.getElementById('artist')).value;
    const year = (<HTMLInputElement> document.getElementById('year')).value;
    const url = (<HTMLInputElement> document.getElementById('url')).value;
    const lyrics = (<HTMLInputElement> document.getElementById('lyrics')).value;
    this.authService.setSongState(title, artist, year === undefined ? undefined : +year, url, lyrics);
    this.song = this.authService.getSongState();
    this.validation = this.authService.isSongValid();
    if (!this.validation.valid) {
      // Don't save
      return;
    }
    // Try save (Server validation may fail)
    this.authService.saveSong().subscribe( data => {
      console.log(data);
      this.validation = data;
      if (this.validation.valid) {
        this.successMessage = 'Song successfully saved';
      }
    }, error => {
      console.log(error);
      this.working = false;
      if (error.message !== undefined) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unknown error has occurred';
      }
    }
    );
    // If save completed do something sensible?
  }

}
