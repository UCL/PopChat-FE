import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

interface ResultRow {
  allAnswers: Array<string>;
  answer: string;
  answerCorrect: boolean;
  answerSelectTime: Date;
  question: string;
  questionStartTime: Date;
  songTitle: string;
  username: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public errorMessage: string;
  public results: Array<ResultRow>;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getResults().subscribe(data => {
      console.log(data);
      this.results = data;
    }, error => {
      console.log(error);
      if (error.error !== undefined) {
        if (error.error.message !== undefined) {
          this.errorMessage = error.error.message;
        } else if (error.error.error_description !== undefined) {
          this.errorMessage = error.error.error_description;
        } else if (error.error.error !== undefined) {
          this.errorMessage = error.error.error;
        } else {
          this.errorMessage = 'An unknown error has occurred';
        }
      }
    });
  }

  public diffTime(endTime: string, startTime: string): number {
    const end = new Date(endTime);
    const start = new Date(startTime);
    return (end.getTime() - start.getTime()) / 1000;
  }

}
