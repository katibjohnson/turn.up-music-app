import { Component, Input, OnInit } from '@angular/core';
import { LastFmService } from '../last-fm.service';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css']
})
export class ArtistCardComponent implements OnInit {
  @Input() mbid: string;
  artistInfo: any ={};
  sampleImageUrl: string;
  constructor(private lastFm: LastFmService) { }

  ngOnInit(): void {

    this.getArtistInfo(this.mbid);
    this.getSampleImage(this.mbid);

  }

  getArtistInfo = (mbid:string):any =>{
    this.lastFm.getArtistInfo(mbid).subscribe((response)=>{
      console.log(response.artist);
      this.artistInfo = response.artist;
    })
  }

  getSampleImage = (mbid:string): any =>{
    this.lastFm.getArtistTopAlbums(mbid).subscribe((response)=>{
      this.sampleImageUrl = response.topalbums.album[1].image[2]['#text'];
    })
  }
}
