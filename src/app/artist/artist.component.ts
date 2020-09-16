import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LastFmService } from '../last-fm.service';
import { YoutubeService } from '../youtube.service';
import {ImagePreloadDirective} from '../image-preload.directive';
import {TurnUpService} from '../turn-up.service';
  import { from } from 'rxjs';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artistName: string;
  biography: string;
  imgUrl: string;
  similar: any = [];
  favoritesId: number;
  favoriteButtonText: string;
  videoIdArray: string[] = ['2KkMyDSrBVI','ivCY3Ec4iaU','pok8H_KF1FA', 'pcJo0tIWybY', '4aeETEoNfOg'];
  constructor(private route: ActivatedRoute, private lastFm: LastFmService, private youtube: YoutubeService, private turnup: TurnUpService) { }

  ngOnInit(): void {
    this.getArtistInfo();
    
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  getArtistInfo = (): any=>{
    this.route.queryParamMap.subscribe((params)=>{
      this.lastFm.getArtistInfoByName(params.get('name')).subscribe((response)=>{
        this.artistName = response.artist.name;
        this.biography = response.artist.bio.summary;
        this.similar = response.artist.similar.artist;
        this.getArtistImage();
        this.addToRecent();
        this.setInFavorites();
      })
    })
  }

  getArtistImage = ()=>{
    this.lastFm.getArtistTopAlbums(`${this.artistName}`).subscribe((response) => {
      console.log(response)
      if (response.topalbums) {
        this.imgUrl = response.topalbums.album[0].image[2]['#text'];
        console.log(this.imgUrl);
      }
    });
  }

  getArtistVideos = ()=>{
    this.youtube.getVideos(this.artistName).subscribe((response)=>{
      console.log(response);
    })
  }

  addToRecent = ()=>{
    let artistEntry = {name: this.artistName};
    console.log(artistEntry);
    this.turnup.addToRecent(artistEntry).subscribe((response)=>{
      console.log(response);
    });
  }

  toggleFavorites = ()=>{
    console.log(this.favoritesId);
    if(this.favoritesId)
    {
      this.turnup.deleteFromFavoriteArtists(this.favoritesId).subscribe((response)=>{
        this.favoritesId = 0;
        this.favoriteButtonText = "Add to Favorites";
      })
    }
    else{
      let artistEntry = {name: this.artistName};
      this.turnup.addToFavoriteArtists(artistEntry).subscribe((response)=>{

        this.setInFavorites();
      })
    }

  }

  setInFavorites=()=>{
    let favoriteArtists: any = [];
    this.favoritesId = 0;
    this.favoriteButtonText = "Add to Favorites";
    this.turnup.getFavoriteArtists().subscribe((response)=>{
      favoriteArtists = response;
      favoriteArtists.forEach((item)=>{
        if(item.name === this.artistName)
        {
          this.favoritesId = item.id;
          this.favoriteButtonText = "Remove from Favorites";
        }
      })
     
    })



  }
}
