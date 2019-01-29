import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { map, switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Game {
  url: string;
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  public id: number;
  public game: Game;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private sanitizer: DomSanitizer) { }

  public getUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.game.url + '?&autoplay=1');
  }

  ngOnInit() {
    this.route.params.pipe(
      map(data => +data['id']),
      switchMap( id => {
        return this.authService.getGame(id);
      })
      ).subscribe( game => {
        this.game = game;
        console.log(game);
      });
  }

}
