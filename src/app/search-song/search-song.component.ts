import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LowerCasePipe } from '@angular/common';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

interface SearchResult {
  code: number;
  result: {
    songCount: number;
    songs: Array<Song>;
  };
}
interface Song {
  album: Album;
  artists: Array<Artist>;
  id: number;
  name: string;
  alias: Array<string>;
  copyrightId: number;
  duration: number;
  fee: number;
  ftype: number;
  mvid: number;
  rUrl: string;
  rtype: number;
  status: number;
}

interface Album {
  id: number;
  name: string;
  artist: Artist;
  copyrightId: number;
  picId: number;
  publishTime: string;
  size: number;
  status: number;
}

interface Artist {
  name: string;
  id: number;
  albumnSize: number;
  img1v1: number;
  img1v1Url: string;
  picId: number;
  picUrl: string;
  trans: any;
}

interface Lyrics {
  code: number;
  klyric?: LRC;
  tlyric?: LRC;
  lrc?: LRC;
  qfy: boolean;
  transUser: {
    id: number;
    status: number;
    demand: number;
    userid: number;
    nickname: string;
    uptime: number;
  };
}

interface LRC {
  version: number;
  lyric: string;
}

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.scss']
})
export class SearchSongComponent implements OnInit {

  public errorMessage: string;
  private searchURL = 'https://cors-anywhere.herokuapp.com/https://music.163.com/api/search/get?type=1&s=';
  private lyricsURL = 'https://cors-anywhere.herokuapp.com/https://music.163.com/api/song/lyric?lv=-1&kv=-1&tv=-1&id=';
  private searchUrlFunction: (string) => string;
  private lyricsUrlFunction: (string) => string;
  public searching: boolean;
  public results: SearchResult;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService, private router: Router) {
    this.searching = false;
  }

  ngOnInit() {
    this.results = this.authService.getCachedSearchResults();
    this.searchUrlFunction = function (search) {
      return this.searchURL + encodeURIComponent(search);
    };
    this.lyricsUrlFunction = function(id) {
      return this.lyricsURL + id;
    };
  }

  public submit(): void {
    this.results = undefined;
    this.searching = true;
    this.errorMessage = undefined;
    const searchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    this.httpClient.get<SearchResult>(this.searchUrlFunction(searchTerm)).subscribe(data => {
      this.searching = false;
      this.results = data;
      this.authService.cacheSearchResults(data);
    }, this.handleError);
  }

  public addSong(song: Song): void {
    this.httpClient.get<Lyrics>(this.lyricsUrlFunction(song.id)).subscribe(
      data => {
      let title: string;
      let artist: string;
      let year: number;
      let lyrics: string;
      console.log(data);
      if (data.lrc !== undefined) {
        lyrics = data.lrc.lyric;
      }
      if (song !== undefined) {
        title = song.name;
        if (song.artists !== undefined && song.artists[0] !== undefined) {
            artist = song.artists[0].name;
         }
         if (song.album !== undefined && song.album[0] !== undefined) {
          year = new Date(song.album[0].publishTime).getUTCFullYear();
       }
      }
      this.authService.setSongState(title, artist, year, undefined, lyrics);
      this.router.navigate(['addSong']);
      }, this.handleError
    );
  }

  public handleError(error) {
      console.log(error);
      this.searching = false;
      if (error.message !== undefined) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unknown error has occurred';
      }
  }
}
