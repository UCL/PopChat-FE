import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { map, switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Game {
  url: string;
  endTime: number;
  startTime: number;
  questions: Array<Question>;
}

interface Question {
  questionText: string;
  answers: Array<Answer>;
}

interface Answer {
  value: string;
  correct: boolean;
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  public id: number;
  public game: Game;
  public currentIndex: number;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private sanitizer: DomSanitizer) {
    this.currentIndex = 0;
   }

  public getUrl(): string {
    return this.game.url + '?start=' + this.game.startTime + '&end=' + this.game.endTime + '&autoplay=1&controls=0';
  }

  public submitAnswer(event: Event, answer: Answer): boolean {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.srcElement.classList.add(answer.correct ? 'right' : 'wrong');
    console.log(answer.correct ? 'yay' : ':(');
    setTimeout(() => {
        event.srcElement.classList.remove(answer.correct ? 'right' : 'wrong');
        if (answer.correct) {
          if (this.currentIndex < this.game.questions.length) {
            this.currentIndex += 1;
          }
        }
    }, 800);
    return false;
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
        (<HTMLIFrameElement>window.document.getElementById('video')).src = this.getUrl();
      });
  }

}
