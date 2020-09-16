import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor(private youtube: YoutubeService) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.currentVideoIdIndex = 0;
    this.currentVideoId = this.videoIdArray[this.currentVideoIdIndex];
    console.log(this.currentVideoId);
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




}
