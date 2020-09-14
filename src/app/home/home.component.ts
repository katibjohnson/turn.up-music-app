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

  constructor(private lastFm: LastFmService, private youtube: YoutubeService, private turnup: TurnUpService) { }

  ngOnInit(): void {

    this.searchForArtist('bladee');
    this.getTopArtists();
    this.getArtistInfo('cd689e77-dfdd-4f81-b50c-5e5a3f5e38a4');
    this.getVideos('bladee');
    this.getRecent();
  }

  searchForArtist = (searchTerm: string): any=>{
    this.lastFm.getArtists(searchTerm).subscribe((response)=>{
      console.log(response.results.artistmatches.artist);
    })
  }

  getTopArtists = ():any =>{
    this.lastFm.getTopArtists().subscribe((response)=>{
      console.log(response.artists.artist);
    })
  }

  getArtistInfo = (mbid:string):any =>{
    this.lastFm.getArtistInfo(mbid).subscribe((response)=>{
      console.log(response);
    })
  }

  getVideos = (searchTerm: string): any =>{
    this.youtube.getVideos(searchTerm).subscribe((response)=>{
      console.log(response.items);
    })
  }

  getRecent = ():any =>{
    this.turnup.getRecent().subscribe((response)=>{
      response.forEach((artist)=>{
        console.log("Get recent working");
        this.getArtistInfo(artist.mbid);
      })
    })
  }

  addArtistToRecent = ():any =>{
    
  }
  

}
