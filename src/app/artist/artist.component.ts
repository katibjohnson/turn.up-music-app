import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LastFmService } from '../last-fm.service';
import { YoutubeService } from '../youtube.service';
import { ImagePreloadDirective } from '../image-preload.directive';
import { TurnUpService } from '../turn-up.service';
import { from } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { VideoPlayerComponent } from '../video-player/video-player.component';

import { NgForm } from '@angular/forms';
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
  videoArray = [
    {
      title: 'bladee & ECCO2K - Obedient',
      thumbnail: 'https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg',
      artist: 'Bladee',
      videoId: '2KkMyDSrBVI',
      favorited: false,
    },
    {
      title: 'bladee & ECCO2K - Obedient',
      thumbnail: 'https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg',
      artist: 'Bladee',
      videoId: '2KkMyDSrBVI',
      favorited: false,
    },
    {
      title: 'bladee & ECCO2K - Obedient',
      thumbnail: 'https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg',
      artist: 'Bladee',
      videoId: '2KkMyDSrBVI',
      favorited: false,
    },
    {
      title: 'bladee & ECCO2K - Obedient',
      thumbnail: 'https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg',
      artist: 'Bladee',
      videoId: '2KkMyDSrBVI',
      favorited: false,
    },
    {
      title: 'bladee & ECCO2K - Obedient',
      thumbnail: 'https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg',
      artist: 'Bladee',
      videoId: '2KkMyDSrBVI',
      favorited: false,
    },
    {
      title: 'bladee & ECCO2K - Obedient',
      thumbnail: 'https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg',
      artist: 'Bladee',
      videoId: '2KkMyDSrBVI',
      favorited: false,
    },
    {
      title: 'bladee & ECCO2K - Obedient',
      thumbnail: 'https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg',
      artist: 'Bladee',
      videoId: '2KkMyDSrBVI',
      favorited: false,
    },
  ];
  currentVideoIndex: number;
  currentVideoId: string;
  currentVideo: any = {};

  constructor(
    private route: ActivatedRoute,
    private lastFm: LastFmService,
    private youtube: YoutubeService,
    private turnup: TurnUpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((response) => {
      this.getArtistInfo();
    });
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
      this.youtube.setYoutubeApiKey(params.get('apiKey'));
      this.lastFm
        .getArtistInfoByName(params.get('name'))
        .subscribe((response) => {
          this.artistName = response.artist.name;
          this.biography = this.sliceBio(response.artist.bio.content);
          this.turnup.getFavoriteArtists().subscribe((favoriteArtists) => {
            response.artist.similar.artist.forEach((item) => {
              if (favoriteArtists.some((artist) => artist.name === item.name)) {
                this.similar.push({ name: item.name, favorited: true });
              } else {
                this.similar.push({ name: item.name, favorited: false });
              }
            });
          });
          this.getArtistVideos();
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

  setVideo = () => {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('videoId')) {
        let index = this.videoArray.findIndex(
          (item) => item.videoId === params.get('videoId')
        );
        if (index === -1) {
          let favoriteVideos = [];
          this.turnup.getFavoriteVideos().subscribe((response) => {
            favoriteVideos = response;
            let video = favoriteVideos.find((item) => {
              return item.videoid === params.get('videoId');
            });
            this.videoArray.push({
              videoId: video.videoid,
              title: video.title,
              thumbnail: video.thumbnail,
              artist: video.artist,
              favorited: true,
            });
            this.currentVideoIndex = this.videoArray.length - 1;
            this.currentVideo = this.videoArray[this.currentVideoIndex];
            this.currentVideoId = this.videoArray[
              this.currentVideoIndex
            ].videoId;
          });
        } else {
          this.currentVideoIndex = index;
          this.currentVideo = this.videoArray[this.currentVideoIndex];
          this.currentVideoId = this.videoArray[this.currentVideoIndex].videoId;
        }
      } else {
        this.currentVideoIndex = 0;
        this.currentVideo = this.videoArray[this.currentVideoIndex];
        this.currentVideoId = this.videoArray[this.currentVideoIndex].videoId;
      }
    });
  };

  getArtistVideos = () => {
    this.setVideo();
    this.youtube.getVideos(this.artistName).subscribe((response) => {
      let youtubeVideos = response;
      this.videoArray = [];
      this.turnup.getFavoriteVideos().subscribe((response) => {
        let favoriteVideos = response;
        youtubeVideos.items.forEach((item) => {
          this.videoArray.push({
            title: item.snippet.title,
            artist: this.artistName,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.default.url,
            favorited: favoriteVideos.some(
              (video) => video.title === item.snippet.title
            ),
          });
        });
        console.log(this.videoArray);
        this.currentVideoIndex = 0;
        this.currentVideoId = this.videoArray[this.currentVideoIndex].videoId;
        this.setVideo();
      });
    });
  };

  addVideoToFavorites = () => {
    this.turnup
      .addToFavoriteVideos(this.videoArray[this.currentVideoIndex])
      .subscribe();
  };

  // setApiKey = (form: NgForm) => {
  //   console.log(form.value);
  //   this.youtube.setYoutubeApiKey(form.value.apiKey);
  //   this.getArtistVideos();
  // };

  changeVideo = (video: any) => {
    this.currentVideo = video;
  };

  updateFavoriteVideos = (video: any) => {
    if (video.favorited) {
      this.turnup.getFavoriteVideos().subscribe((response) => {
        let idToDelete = response.find((item) => item.title === video.title).id;
        this.turnup
          .deleteFromFavoriteVideos(idToDelete)
          .subscribe((response) => {
            this.videoArray.forEach((item) => {
              if (item.title === video.title) item.favorited = false;
            });
          });
      });
    } else {
      this.turnup
        .addToFavoriteVideos({
          title: video.title,
          artist: video.artist,
          thumbnail: video.thumbnail,
          videoId: video.videoId,
        })
        .subscribe((response) => {
          this.videoArray.forEach((item) => {
            if (item.title === video.title) item.favorited = true;
          });
        });
    }
  };

  updateFavoriteArtists = (artist: any) => {
    if (artist.favorited) {
      this.turnup.getFavoriteArtists().subscribe((response) => {
        let idToDelete = response.find((item) => item.name === artist.name).id;
        this.turnup
          .deleteFromFavoriteArtists(idToDelete)
          .subscribe((response) => {
            this.similar.forEach((item) => {
              if (item.name === artist.name) item.favorited = false;
            });
          });
      });
    } else {
      this.turnup
        .addToFavoriteArtists({ name: artist.name })
        .subscribe((response) => {
          this.similar.forEach((item) => {
            if (item.name === artist.name) item.favorited = true;
          });
        });
    }
  };
}
