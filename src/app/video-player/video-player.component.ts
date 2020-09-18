import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurnUpService } from '../turn-up.service';
import { YoutubeService } from '../youtube.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;
  @Input() artistName;
  @Output() updateVideosEvent = new EventEmitter<void>() ;
  currentVideoIdIndex: number;
  currentVideoId: string;
  videoIdArray: string[] = ['2KkMyDSrBVI','ivCY3Ec4iaU','pok8H_KF1FA', 'pcJo0tIWybY', '4aeETEoNfOg'];
  videoWidth: number | undefined;
  videoHeight: number | undefined;
 

  constructor(private _changeDetectorRef: ChangeDetectorRef, private youtube: YoutubeService, private turnup: TurnUpService, private route: ActivatedRoute) { }
  
 

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.setVideo();

  }

  ngAfterViewInit(): void{
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    // Automatically expand the video to fit the page up to 1200px x 720px
    this.videoWidth = Math.min(this.wrapper.nativeElement.clientWidth, 1000);
    this.videoHeight = this.videoWidth * 0.6;
    this._changeDetectorRef.detectChanges();
  }

  setVideo = ()=>{
    this.route.queryParamMap.subscribe((params)=>{
      if(params.get('videoId')){
        let index = this.videoIdArray.findIndex(item=>item ===params.get('videoId'));
        if(index = -1){
          this.videoIdArray.push(params.get('videoId'));
          this.currentVideoIdIndex = this.videoIdArray.length-1;
        }
        else{
          this.currentVideoIdIndex = index;
        }
      }
      else{
        this.currentVideoIdIndex = 0;
      }
      this.currentVideoId = this.videoIdArray[this.currentVideoIdIndex];
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
      this.currentVideoIdIndex = 0;
      this.currentVideoId= this.videoIdArray[this.currentVideoIdIndex];
    })
  }

  addVideoToFavorites = ()=>{
    // let artist = {title: "bladee & ECCO2K - Obedient", thumbnail: "https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg", artist:"Bladee", videoId: "2KkMyDSrBVI"};
    this.youtube.getVideoById(this.currentVideoId).subscribe((response)=>{
      let artist ={title: response.items[0].snippet.title, thumbnail: response.items[0].snippet.thumbnails.default.url, artist: this.artistName, videoId: this.currentVideoId};
      this.turnup.addToFavoriteVideos(artist).subscribe();
    })

  }




}
