import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistCardComponent } from '../artist-card/artist-card.component';
import { LastFmService } from '../last-fm.service';
import { TurnUpService } from '../turn-up.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  constructor(public router: Router, private lastFm: LastFmService, private turnup: TurnUpService) {}
  favoriteArtistsList: any = [];
  favoriteVideosList: any =[];
  ngOnInit(): void {
    this.getFavoriteArtists();
    this.getFavoriteVideos();
  }
  
  getFavoriteArtists = ()=>{
    this.turnup.getFavoriteArtists().subscribe((response)=>{
      response.forEach((item)=>{
        this.favoriteArtistsList.push({name: item.name, favorited: true});
      })
    })
  }

  getFavoriteVideos = ()=>{
    this.turnup.getFavoriteVideos().subscribe((response)=>{
      
      this.favoriteVideosList = response;
      this.favoriteVideosList.forEach((item)=>{
        item.favorited = true;
      })
    })
  }

  updateFavoriteArtists= (artist: any)=>{
    if(artist.favorited){
      let index = this.favoriteArtistsList.findIndex(item=>item.name === artist.name);
      this.turnup.getFavoriteArtists().subscribe((response)=>{
        let idToDelete = response.find(item=>item.name===artist.name).id;
        this.turnup.deleteFromFavoriteArtists(idToDelete).subscribe((response)=>{
          this.favoriteArtistsList.splice(index, 1);
        });
      })
      
    }
  }

  updateFavoriteVideos = (video: any)=>{
    let index = this.favoriteVideosList.findIndex(item=>item.title === video.title);
    this.turnup.getFavoriteVideos().subscribe((response)=>{
      console.log(response)
      let idToDelete = response.find(item=>item.title===video.title).id;
      this.turnup.deleteFromFavoriteVideos(idToDelete).subscribe((response)=>{
        this.favoriteVideosList.splice(index, 1);
      })
    })

  }


}
