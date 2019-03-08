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

    this.song.title = (<HTMLInputElement> document.getElementById('title')).value;
    this.song.artist = (<HTMLInputElement> document.getElementById('artist')).value;
    this.song.year = +(<HTMLInputElement> document.getElementById('year')).value;
    this.song.video = (<HTMLInputElement> document.getElementById('url')).value;
    this.song.lyrics = (<HTMLInputElement> document.getElementById('lyrics')).value;

    this.authService.setSong(this.song);
    this.validation = this.authService.isSongValid();
    if (!this.validation.valid) {
      // Don't save
      this.working = false;
      return;
    }
    // Try save (Server validation may fail)
    this.authService.saveSong().subscribe( data => {
      console.log(data);
      this.working = false;
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
