import { Component, OnInit } from '@angular/core';
import {LastFmService} from '../last-fm.service';
import {YoutubeService} from '../youtube.service';
import {TurnUpService} from '../turn-up.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentlyPlayed = [];
  favoriteArtists = [];
  topArtists = [];

  constructor(private lastFm: LastFmService, private youtube: YoutubeService, private turnup: TurnUpService) { }

  ngOnInit(): void {

    // this.searchForArtist('bladee');
    // this.getTopArtists();
    // this.getArtistInfo('cd689e77-dfdd-4f81-b50c-5e5a3f5e38a4');
    // this.getVideos('bladee');
    // this.getRecent();
    // this.getFavoriteArtists();

    this.getRecent();
    this.getTopArtists();
    this.getFavoriteArtists();
  }

  getRecent = ():void =>{
    this.turnup.getRecent().subscribe((response)=>{
      console.log(response);
       this.recentlyPlayed = response;
    })
  }

  getFavoriteArtists = ():void =>{
    this.turnup.getFavoriteArtists().subscribe((response)=>{
      console.log(response);
      this.favoriteArtists = response;
    })
  }

  getTopArtists = ():void =>{
    this.lastFm.getTopArtists().subscribe((response)=>{
      
      let i: number = 0;
      while(this.topArtists.length <= 10){
        if(response.artists.artist[i].mbid !=""){
          this.topArtists.push(response.artists.artist[i]);
        }
        // this.topArtists.push(response.artists.artist[i]);

        i++;
      }
      console.log(this.topArtists);
    })
  }





  searchForArtist = (searchTerm: string): any=>{
    this.lastFm.getArtists(searchTerm).subscribe((response)=>{
      console.log(response.results.artistmatches.artist);
    })
  }

  
  getArtistInfo = (mbid:string):any =>{
    this.lastFm.getArtistInfoByMbid(mbid).subscribe((response)=>{
      console.log(response);
    })
  }

  getVideos = (searchTerm: string): any =>{
    this.youtube.getVideos(searchTerm).subscribe((response)=>{
      console.log(response.items);
    })
  }

}
