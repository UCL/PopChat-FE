import { Component, OnInit } from '@angular/core';
import { AuthenticationService, SongHeadline } from '../authentication.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  public songs: Array<SongHeadline>;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.getSongs().subscribe(data => this.songs = data.content, error => console.log(error));
  }

}
