import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LastFmService } from '../last-fm.service';
import { TurnUpService } from '../turn-up.service';

@Component({
  selector: 'app-home-top-artists',
  templateUrl: './home-top-artists.component.html',
  styleUrls: ['./home-top-artists.component.css'],
})
export class HomeTopArtistsComponent implements OnInit {
  @Input() list: any[];
  @Output() favoriteEvent = new EventEmitter<any>();
  constructor(public router: Router) {}

  ngOnInit(): void {}

  updateFavorites = (artist: any) => {
    this.favoriteEvent.emit(artist);
  };

  goToArtist = (artist: string) => {
    this.router.navigate(['artist'], {
      queryParams: {
        name: artist,
      },
    });
  };
}
