import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LastFmService } from '../last-fm.service';
import { YoutubeService } from '../youtube.service';
import { ImagePreloadDirective } from '../image-preload.directive';
import { TurnUpService } from '../turn-up.service';
import { from } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { VideoPlayerComponent } from '../video-player/video-player.component';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  artistName: string;
  biography: string;
  imgUrl: string;
  similar: any = [];
  favoritesId: number;
  bioExpand: boolean = false;
  favoriteButtonText: string;
  videoArray = [{title: "bladee & ECCO2K - Obedient", thumbnail: "https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg", artist:"Bladee", videoId: "2KkMyDSrBVI"}];
  currentVideoIndex: number;
  currentVideoId: string;

  constructor(
    private route: ActivatedRoute,
    private lastFm: LastFmService,
    private youtube: YoutubeService,
    private turnup: TurnUpService
  ) {}

  ngOnInit(): void {
    this.getArtistInfo();
    this.setVideo();
  }

  sliceBio = (bio: string) => {
    for (let i = 0; i < bio.length; i++) {
      if (bio[i] === '<') {
        return bio.slice(0, i);
      }
    }
    return bio;
  };

  getArtistInfo = (): any => {
    this.route.queryParamMap.subscribe((params) => {
      this.lastFm
        .getArtistInfoByName(params.get('name'))
        .subscribe((response) => {
          this.artistName = response.artist.name;
          this.biography = this.sliceBio(response.artist.bio.content);
          this.similar = response.artist.similar.artist;
          console.log(this.similar);
          this.getArtistImage();
          this.addToRecent();
          this.setInFavorites();
        });
    });
  };

  getArtistImage = () => {
    this.lastFm
      .getArtistTopAlbums(`${this.artistName}`)
      .subscribe((response) => {
        if (response.topalbums) {
          if (response.topalbums.album[0]) {
            this.imgUrl = response.topalbums.album[0].image[2]['#text'];
          }
        }
      });
  };

  addToRecent = () => {
    let artistEntry = { name: this.artistName };
    console.log(artistEntry);
    let recent = [];
    this.turnup.getRecent().subscribe((response) => {
      recent = response;

      recent.forEach((item) => {
        if (item.name === this.artistName) {
          this.turnup.deleteFromRecent(item.id).subscribe();
        }
      });
      if (recent.length > 10) {
        this.turnup.deleteFromRecent(recent[recent.length - 1].id).subscribe();
      }

      this.turnup.addToRecent(artistEntry).subscribe();
    });
  };

  toggleFavorites = () => {
    if (this.favoritesId) {
      this.turnup
        .deleteFromFavoriteArtists(this.favoritesId)
        .subscribe((response) => {
          this.favoritesId = 0;
        });
    } else {
      let artistEntry = { name: this.artistName };
      this.turnup.addToFavoriteArtists(artistEntry).subscribe((response) => {
        this.setInFavorites();
      });
    }
  };

  setInFavorites = () => {
    let favoriteArtists: any = [];
    this.favoritesId = 0;
    this.turnup.getFavoriteArtists().subscribe((response) => {
      favoriteArtists = response;
      favoriteArtists.forEach((item) => {
        if (item.name === this.artistName) {
          this.favoritesId = item.id;
        }
      });
    });
  };

  toggleBio = () => {
    this.bioExpand = !this.bioExpand;
  };

  setVideo = ()=>{
    this.route.queryParamMap.subscribe((params)=>{
      if(params.get('videoId')){
        let index = this.videoArray.findIndex(item=>item.videoId===params.get('videoId'));
        if(index === -1)
        {
          let favoriteVideos = [];
          this.turnup.getFavoriteVideos().subscribe((response)=>{
            favoriteVideos = response;
            let video = favoriteVideos.find((item)=>{
              return item.videoid === params.get('videoId');
            })
            this.videoArray.push({videoId: video.videoid, title: video.title, thumbnail: video.thumbnail, artist: video.artist});
            this.currentVideoIndex = this.videoArray.length-1;
            this.currentVideoId = this.videoArray[this.currentVideoIndex].videoId;
          })
        }
        else{
          this.currentVideoIndex = index;
          this.currentVideoId = this.videoArray[this.currentVideoIndex].videoId;
        }
      }
      else{
        this.currentVideoIndex = 0;
        this.currentVideoId = this.videoArray[this.currentVideoIndex].videoId;
      }

    })
  }

  getArtistVideos = ()=>{
    this.youtube.getVideos(this.artistName).subscribe((response)=>{
      this.videoArray = [];
      response.items.forEach((item)=>{
        this.videoArray.push({title: item.snippet.title, artist:this.artistName, videoId: item.id.videoId, thumbnail: item.snippet.thumbnails.default.url});
      })
      this.currentVideoIndex = 0;
      this.currentVideoId= this.videoArray[this.currentVideoIndex].videoId;

    
    })
  }

  addVideoToFavorites = ()=>{
    this.turnup.addToFavoriteVideos(this.videoArray[this.currentVideoIndex]).subscribe();
  }

}
