import { Component, OnInit } from '@angular/core';
import { LastFmService } from '../last-fm.service';
import { YoutubeService } from '../youtube.service';
import { TurnUpService } from '../turn-up.service';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recentlyPlayed: any[] = [];
  favoriteArtists: any[] = [];
  topArtists: any[] = [];

  constructor(
    private lastFm: LastFmService,
    private youtube: YoutubeService,
    private turnup: TurnUpService
  ) {}

  ngOnInit(): void {
    this.getLists();
  }

  getLists = ()=>{
    this.turnup.getFavoriteArtists().subscribe((response) => {
      response.forEach((item)=>{
        this.favoriteArtists.push({name: item.name, favorited: true});
      })
      console.log(this.favoriteArtists);
      this.turnup.getRecent().subscribe((response) => {
        response.forEach((item)=>{
          this.recentlyPlayed.push({name: item.name});
        })
        this.favoritesSetter(this.recentlyPlayed);
        console.log(this.recentlyPlayed)
      });
      this.lastFm.getTopArtists().subscribe((response) => {
        response.artists.artist.slice(0, 10).forEach(artist=>{
          this.topArtists.push({name: artist.name});  
        })
        this.favoritesSetter(this.topArtists);
        console.log(this.topArtists)
        
      });
      
    });
  }

  updateFavorites = (artist: any)=>{
    if(artist.favorited){
      let index = this.favoriteArtists.findIndex(item=>item.name === artist.name);
      this.turnup.getFavoriteArtists().subscribe((response)=>{
        let idToDelete = response.find(item=>item.name===artist.name).id;
        this.turnup.deleteFromFavoriteArtists(idToDelete).subscribe((response)=>{
          this.favoriteArtists.splice(index, 1);
          this.recentlyPlayed.forEach(item=>{
            if(item.name === artist.name) item.favorited = false;
          })
          this.topArtists.forEach(item=>{
            if(item.name === artist.name) item.favorited = false;
          })
        });
      })
      
     
    }
    else{
      this.turnup.addToFavoriteArtists({name: artist.name}).subscribe((response)=>{
        this.favoriteArtists.unshift({name: artist.name, favorited: true});
        this.recentlyPlayed.forEach(item=>{
          if(item.name === artist.name) item.favorited = true;
        })
        this.topArtists.forEach(item=>{
          if(item.name === artist.name) item.favorited = true;
        })
      });
      
    }
  }

  favoritesSetter = (artistArray: any[])=>{
    artistArray.forEach((item)=>{
      if(this.favoriteArtists.some(artist=>artist.name === item.name)){
        item.favorited = true;
      }
      else{
        item.favorited = false;
      }
    })
  }

  searchForArtist = (searchTerm: string): any => {
    this.lastFm.getArtists(searchTerm).subscribe();
  };

  getArtistInfo = (mbid: string): any => {
    this.lastFm.getArtistInfoByMbid(mbid).subscribe();
  };

  getVideos = (searchTerm: string): any => {
    this.youtube.getVideos(searchTerm).subscribe();
  };
}
