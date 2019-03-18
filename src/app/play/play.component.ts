import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { map, switchMap } from 'rxjs/operators';
import * as moment from '../../../node_modules/moment/moment';

interface Game {
  gameId: number;
  url: string;
  endTime: number;
  startTime: number;
  questions: Array<Question>;
}

interface Question {
  questionId: number;
  questionText: string;
  questionStart: string;
  questionEnd: string;
  answers: Array<Answer>;
}

interface Answer {
  optionId: number;
  value: string;
  correct: boolean;
  startTime?: Date;
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {

  public id: number;
  public game: Game;
  public currentIndex: number;
  private timer: NodeJS.Timer;
  public active: boolean;
  private player: YT.Player;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService) {
    this.currentIndex = 0;
    this.active = false;
   }

  public getUrl(): string {
    return this.game.url + '?start=' + this.game.startTime + '&end=' + this.game.endTime + '&autoplay=1&controls=0&enablejsapi=1';
  }

  public submitAnswer(event: Event, answer: Answer): boolean {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.srcElement.classList.add(answer.correct ? 'right' : 'wrong');
    console.log(answer.correct ? 'yay' : ':(');
    this.authService.submitAnswer(answer.optionId, answer.startTime, new Date());
    const self = this;
    setTimeout(() => {
        event.srcElement.classList.remove(answer.correct ? 'right' : 'wrong');
        if (answer.correct) {
          if (this.currentIndex < this.game.questions.length) {
            this.currentIndex += 1;
            this.tagStart();
            if (this.currentIndex < this.game.questions.length) {
              self.player.playVideo();
            }
          }
        }
    }, 800);
    return false;
  }

  ngOnInit() {
    const player = (<HTMLIFrameElement>window.document.getElementById('video'));
    this.route.params.pipe(
      map(data => +data['id']),
      switchMap( id => {
        return this.authService.getGame(id);
      })
      ).subscribe( game => {
        this.game = game;
        console.log(game);
        player.src = this.getUrl();
        this.startGame();
        this.tagStart();
      });
  }

  private tagStart(): void {
    if (this.currentIndex < this.game.questions.length) {
      this.game.questions[this.currentIndex].answers.forEach(a => a.startTime = new Date());
    }
    this.active = false;
  }

  private startGame(): void {
    this.player = new YT.Player('video', {});
    const self = this;
    this.timer = setInterval(function() {
      const time = self.player.getCurrentTime();
      if (self.currentIndex < self.game.questions.length) {
        const start = moment.duration(self.game.questions[self.currentIndex].questionStart);
        const end = moment.duration(self.game.questions[self.currentIndex].questionEnd);
        const songCurrent = moment.duration(time, 'seconds');
        if (songCurrent >= end) {
          self.player.pauseVideo();
          self.active = true;
        } else if (start < songCurrent) {
          self.active = true;
        }
      } else {
        clearInterval(this.timer);
        this.timer = undefined;
      }
    }, 500 );
  }

  public ngOnDestroy() {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
    }
  }

}
