import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  private id: number;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
        this.id = +data['id'];
        this.authService.getGame(this.id).subscribe( game => console.log(game));
      });
  }

}
