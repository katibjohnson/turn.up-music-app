import { Component, Input, OnInit } from '@angular/core';
import { LastFmService } from '../last-fm.service';
import {ImagePreloadDirective} from '../image-preload.directive';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css'],
})
export class ArtistCardComponent implements OnInit {
  @Input() name: string;
  artistInfo: any = {};
  sampleImageUrl: string;
  constructor(private lastFm: LastFmService) {}

  ngOnInit(): void {
    this.getArtistInfo(this.name);
    this.getSampleImage(this.name);
  }

  getArtistInfo = (name: string): any => {
    this.lastFm.getArtistInfoByName(name).subscribe((response) => {
      //console.log(response.artist);
      this.artistInfo = response.artist;
    });
  };

  getSampleImage = (name: string): any => {
    this.lastFm.getArtistTopAlbums(name).subscribe((response) => {
      console.log(response);
      if (response.topalbums) {
        if (response.topalbums.album) {
          this.sampleImageUrl = response.topalbums.album[0].image[2]['#text'];
        }
      }
    });
  };
}
