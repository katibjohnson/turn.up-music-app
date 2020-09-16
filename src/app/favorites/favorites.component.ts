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

  ngOnInit(): void {
    this.getFavoriteArtists();
  }
  favoritesList: any = [];
  getFavoriteArtists = ()=>{
    this.turnup.getFavoriteArtists().subscribe((response)=>{
      this.favoritesList = response;
    })
  }
}
