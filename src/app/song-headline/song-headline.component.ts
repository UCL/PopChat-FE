import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-headline',
  templateUrl: './song-headline.component.html',
  styleUrls: ['./song-headline.component.scss']
})
export class SongHeadlineComponent implements OnInit {

  @Input() title: string;
  @Input() id: string;
  @Input() artist: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
