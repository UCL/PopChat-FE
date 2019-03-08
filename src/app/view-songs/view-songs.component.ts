import { Component, OnInit } from '@angular/core';
import { AuthenticationService, DatabaseSong } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-songs',
  templateUrl: './view-songs.component.html',
  styleUrls: ['./view-songs.component.scss']
})
export class ViewSongsComponent implements OnInit {

  public songs: Array<DatabaseSong>;
  public errorMessage: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.getAllSongList().subscribe(data => this.songs = data, error => {
      if (error.message !== undefined) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unknown error has occurred';
      }
    });
  }

  public editSong(song: DatabaseSong): void {
    this.errorMessage = undefined;
    this.authService.setSong(song);
    this.router.navigate(['/addSong']);
  }

  public delete(song: DatabaseSong, event: Event): void {
    this.errorMessage = undefined;

    this.authService.deleteSong(song).subscribe(data => {
      if (data) {
        this.songs = this.songs.filter(s => s.id !== song.id);
      } else {
        this.errorMessage = 'Failed to delete song ' + song.title;
      }
    }, error => {
      if (error.message !== undefined) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unknown error has occurred';
      }
    });
    event.preventDefault();
    event.stopPropagation();
  }
}
