import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LastFmService } from '../last-fm.service';
import {ImagePreloadDirective} from '../image-preload.directive';

@Component({
  selector: 'app-result-entry',
  templateUrl: './result-entry.component.html',
  styleUrls: ['./result-entry.component.css'],
})
export class ResultEntryComponent implements OnInit {
  @Input() artist: any;
  @Output() artistClicked = new EventEmitter<string>();
 
  imgUrl: string;

  constructor(private lastFm: LastFmService) {}

  ngOnInit(): void {
    this.getArtistImage(this.artist.name);
  }

  getArtistImage = (artist: string) => {
    this.lastFm.getArtistTopAlbums(artist).subscribe((response) => {
      if (response.topalbums) {
        if(response.topalbums.album[0]){
          if(response.topalbums.album[0].image[2]){
            this.imgUrl = response.topalbums.album[0].image[2]['#text'];
          }

          
        }

      }
    });
  };

  goToArtist = (artist)=>{
    this.artistClicked.emit(artist.name);
  }
}
