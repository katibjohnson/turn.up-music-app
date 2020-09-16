import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LastFmService } from '../last-fm.service';
import { YoutubeService } from '../youtube.service';
import { ImagePreloadDirective } from '../image-preload.directive';
import { TurnUpService } from '../turn-up.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  artistName: string;
  biography: string;
  imgUrl: string;
  similar: any = [];
  favoritesId: number;

  favoriteButtonText: string;
  videoIdArray: string[] = [
    '2KkMyDSrBVI',
    'ivCY3Ec4iaU',
    'pok8H_KF1FA',
    'pcJo0tIWybY',
    '4aeETEoNfOg',
  ];
  constructor(
    private route: ActivatedRoute,
    private lastFm: LastFmService,
    private youtube: YoutubeService,
    private turnup: TurnUpService
  ) {}

  ngOnInit(): void {
    this.getArtistInfo();

  }

  getArtistInfo = (): any=>{
    this.route.queryParamMap.subscribe((params)=>{
      this.lastFm.getArtistInfoByName(params.get('name')).subscribe((response)=>{
        this.artistName = response.artist.name;
        this.biography = response.artist.bio.summary;
        this.similar = response.artist.similar.artist;
        console.log(this.similar);
        this.getArtistImage();
        this.addToRecent();
        this.setInFavorites();
      })
    })
  }

  getArtistImage = ()=>{
    this.lastFm.getArtistTopAlbums(`${this.artistName}`).subscribe((response) => {
      if (response.topalbums) {
        if(response.topalbums.album[0]){
          this.imgUrl = response.topalbums.album[0].image[2]['#text'];
        }
      }
    });
  };

  addToRecent = ()=>{
    let artistEntry = {name: this.artistName};
    console.log(artistEntry);
    let recent = [];
    this.turnup.getRecent().subscribe((response)=>{
      recent = response;
      if(!recent.some((item)=>{
        return item.name ===this.artistName;
      })){
        this.turnup.addToRecent(artistEntry).subscribe((response)=>{
          console.log(response);
        });
      }
    })

  }

  toggleFavorites = ()=>{
    

    if (this.favoritesId) {
      this.turnup
        .deleteFromFavoriteArtists(this.favoritesId)
        .subscribe((response) => {
          this.favoritesId = 0;
        });
    } else {
      let artistEntry = { name: this.artistName };
      this.turnup.addToFavoriteArtists(artistEntry).subscribe((response) => {
        this.setInFavorites();
      });
    }
  };

  setInFavorites = () => {
    let favoriteArtists: any = [];
    this.favoritesId = 0;
    this.turnup.getFavoriteArtists().subscribe((response) => {
      favoriteArtists = response;
      favoriteArtists.forEach((item) => {
        if (item.name === this.artistName) {
          this.favoritesId = item.id;
        }
      });
    });
  };
}
