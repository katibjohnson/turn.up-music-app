import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LastFmService } from '../last-fm.service';
import { YoutubeService } from '../youtube.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artistName: string;
  biography: string;
  imgUrl: string;
  similar: any = [];
  videoIdArray: string[] = ['2KkMyDSrBVI','ivCY3Ec4iaU','pok8H_KF1FA', 'pcJo0tIWybY', '4aeETEoNfOg'];
  constructor(private route: ActivatedRoute, private lastFm: LastFmService, private youtube: YoutubeService) { }

  ngOnInit(): void {
    this.getArtistInfo();
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  getArtistInfo = (): any=>{
    this.route.queryParamMap.subscribe((params)=>{
      this.lastFm.getArtistInfoByName(params.get('name')).subscribe((response)=>{
        console.log(response);
        this.artistName = response.artist.name;
        this.biography = response.artist.bio.summary;
        this.similar = response.artist.similar.artist;
        this.getArtistImage();
        console.log(this.similar);
      })
    })
  }

  getArtistImage = ()=>{
    this.lastFm.getArtistTopAlbums(`${this.artistName}`).subscribe((response) => {
      console.log(response)
      if (response.topalbums) {
        this.imgUrl = response.topalbums.album[0].image[2]['#text'];
        console.log(this.imgUrl);
      }
    });
  }

  getArtistVideos = ()=>{
    this.youtube.getVideos(this.artistName).subscribe((response)=>{
      console.log(response);
    })
  }
}
