import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  styles: [
    `
      :host-context(.vertical) .artists {
        flex-direction: column;
        align-items: center;
        height: 43vh;
        width: 12vw;
        overflow-y: auto;
      }
    `,
  ],
})
export class ArtistListComponent implements OnInit {
  @Input() list: any[];
  @Output() favoriteEvent = new EventEmitter<any>();

  constructor(public router: Router) {}

  ngOnInit(): void {}

  goToArtist = (artist: string) => {
    this.router.navigate(['artist'], {
      queryParams: {
        name: artist,
      },
    });
  };

  updateFavorites = (artist: any) => {
    this.favoriteEvent.emit(artist);
  };
}
