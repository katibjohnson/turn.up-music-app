import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TurnUpService } from '../turn-up.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
  styles: [
    `
      :host-context(.large) .video-card {
        width: 15vw;
        z-index: 1;
      }
      :host-context(.large) .img-box {
        min-width: 14vw;
      }
      :host-context(.large) .fa-plus-square {
        font-size: 2vw;
        right: 0.5vw;
      }
      :host-context(.large) .fa-minus-square {
        font-size: 3vw;
        right: 0.5vw;
      }
      :host-context(.large) .video-name {
        font-size: 1.5vw;
        margin: 1vh 0;
      }
    `,
  ],
})
export class VideoCardComponent implements OnInit {
  @Input() videoInfo: any;
  @Output() videoClicked = new EventEmitter<any>();
  @Output() videoFavorited = new EventEmitter<any>();
  favoritesId: number;
  constructor(private turnup: TurnUpService) {}

  ngOnInit(): void {}

  goToArtist = () => {
    this.videoClicked.emit(this.videoInfo);
  };

  setInFavorites = () => {
    let favoriteVideos: any = [];
    this.favoritesId = 0;
    this.turnup.getFavoriteVideos().subscribe((response) => {
      favoriteVideos = response;
      favoriteVideos.forEach((item) => {
        if (item.title === this.videoInfo.title) {
          this.favoritesId = item.id;
        }
      });
      console.log(this.favoritesId);
    });
  };

  toggleFavorites = () => {
    this.videoFavorited.emit(this.videoInfo);
  };
}
