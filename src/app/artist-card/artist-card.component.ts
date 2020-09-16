import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LastFmService } from '../last-fm.service';
import {ImagePreloadDirective} from '../image-preload.directive';
import { TurnUpService } from '../turn-up.service';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css'],
})
export class ArtistCardComponent implements OnInit {
  @Input() name: string;
  @Output() artistClicked = new EventEmitter<string>();
  artistInfo: any = {};
  sampleImageUrl: string;
  favoritesId: number;
  constructor(private lastFm: LastFmService, private turnup: TurnUpService) {}

  ngOnInit(): void {
    this.getArtistInfo(this.name);
    this.getSampleImage(this.name);
    this.setInFavorites();
  }

  getArtistInfo = (name: string): any => {
    this.lastFm.getArtistInfoByName(name).subscribe((response) => {
      //console.log(response.artist);
      this.artistInfo = response.artist;
    });
  };

  getSampleImage = (name: string): any => {
    this.lastFm.getArtistTopAlbums(name).subscribe((response) => {
      if (response.topalbums) {
        if (response.topalbums.album[0]) {
          this.sampleImageUrl = response.topalbums.album[0].image[2]['#text'];
        }
      }
    });
  };

  goToArtist = ()=>{
    this.artistClicked.emit(this.name);
  }

  setInFavorites=()=>{
    let favoriteArtists: any = [];
    this.favoritesId = 0;
    this.turnup.getFavoriteArtists().subscribe((response)=>{
      favoriteArtists = response;
      favoriteArtists.forEach((item)=>{
        if(item.name === this.name)
        {
          this.favoritesId = item.id;
        }
      })
     
    })
  }

  toggleFavorites = ()=>{
    if(this.favoritesId)
    {
      this.turnup.deleteFromFavoriteArtists(this.favoritesId).subscribe((response)=>{
        this.favoritesId = 0;
      })
    }
    else{
      let artistEntry = {name: this.name};
      this.turnup.addToFavoriteArtists(artistEntry).subscribe((response)=>{

        this.setInFavorites();
      })
    }

  }



}

