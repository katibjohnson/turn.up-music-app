import { Component, Input, OnInit } from '@angular/core';
import { LastFmService } from '../last-fm.service';

@Component({
  selector: 'app-result-entry',
  templateUrl: './result-entry.component.html',
  styleUrls: ['./result-entry.component.css'],
})
export class ResultEntryComponent implements OnInit {
  @Input() artist: any;

  imgUrl: string;

  constructor(private lastFm: LastFmService) {}

  ngOnInit(): void {
    this.getArtistImage(this.artist.name);
  }

  getArtistImage = (artist: string) => {
    this.lastFm.getArtistTopAlbums(artist).subscribe((response) => {
      if (response.topalbums) {
        this.imgUrl = response.topalbums.album[1].image[2]['#text'];
        console.log(this.imgUrl);
      }
    });
  };
}
