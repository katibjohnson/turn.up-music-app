import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TurnUpService } from '../turn-up.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {
  @Input() videoInfo: any;
  @Output() videoClicked = new EventEmitter<any>();
  @Output() videoFavorited = new EventEmitter<any>();
  favoritesId: number;
  constructor(private turnup: TurnUpService) { }

  ngOnInit(): void {
    this.setInFavorites();
  }

  goToArtist = ()=>{
    this.videoClicked.emit(this.videoInfo);
  }

  setInFavorites = ()=>{
    let favoriteVideos: any = [];
    this.favoritesId = 0;
    this.turnup.getFavoriteVideos().subscribe((response)=>{
      favoriteVideos = response;
      favoriteVideos.forEach((item)=>{
        if(item.title === this.videoInfo.title){
          this.favoritesId = item.id;
        }
      })
    })
  }

  toggleFavorites = () =>{
    this.videoFavorited.emit(this.videoInfo);
  }


}
