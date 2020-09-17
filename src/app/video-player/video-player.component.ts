import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurnUpService } from '../turn-up.service';
import { YoutubeService } from '../youtube.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Input() artistName;
  @Output() updateVideosEvent = new EventEmitter<void>() ;
  currentVideoIdIndex: number;
  currentVideoId: string;
  videoIdArray: string[] = ['2KkMyDSrBVI','ivCY3Ec4iaU','pok8H_KF1FA', 'pcJo0tIWybY', '4aeETEoNfOg'];
  constructor(private youtube: YoutubeService, private turnup: TurnUpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.setVideo();
    this.currentVideoIdIndex = 0;
    this.currentVideoId = this.videoIdArray[this.currentVideoIdIndex];
  }

  setVideo = ()=>{
    this.route.queryParamMap.subscribe((params)=>{
      if(params.get('videoId')){
        console.log(params.get('videoId'));
      }
    })
  }

  nextVideo = ()=>{
    if(this.currentVideoIdIndex<this.videoIdArray.length-1){
      this.currentVideoIdIndex++;
    }
    else{
      this.currentVideoIdIndex = 0;
    }
    this.currentVideoId= this.videoIdArray[this.currentVideoIdIndex];
  }

  previousVideo = ()=>{
    if(this.currentVideoIdIndex>0){
      this.currentVideoIdIndex--;
    }
    else{
      this.currentVideoIdIndex = this.videoIdArray.length-1;
    }
    this.currentVideoId= this.videoIdArray[this.currentVideoIdIndex];

  }

  getArtistVideos = ()=>{
    this.youtube.getVideos(this.artistName).subscribe((response)=>{
      this.videoIdArray = [];
      response.items.forEach((item)=>{
        this.videoIdArray.push(item.id.videoId);
      })
      console.log(this.videoIdArray);
      this.currentVideoIdIndex = 0;
      this.currentVideoId= this.videoIdArray[this.currentVideoIdIndex];
    })
  }

  addVideoToFavorites = ()=>{
    // let artist = {title: "bladee & ECCO2K - Obedient", thumbnail: "https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg", artist:"Bladee", videoId: "2KkMyDSrBVI"};
    this.youtube.getVideoById(this.currentVideoId).subscribe((response)=>{
      console.log(response.items[0]);
      let artist ={title: response.items[0].snippet.title, thumbnail: response.items[0].snippet.thumbnails.default.url, artist: this.artistName, videoId: this.currentVideoId};
      console.log(artist);
      this.turnup.addToFavoriteVideos(artist).subscribe();
    })

  }




}
