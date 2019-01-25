import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song-headline',
  templateUrl: './song-headline.component.html',
  styleUrls: ['./song-headline.component.scss']
})
export class SongHeadlineComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
