import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      this.favoriteArtistsList = response;
    })
  }

  getFavoriteVideos = ()=>{
    this.turnup.getFavoriteVideos().subscribe((response)=>{
      this.favoriteVideosList = response;
    })
  }
}
