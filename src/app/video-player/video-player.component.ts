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
  currentVideoIndex: number;
  previousVideoIndex: number;
  nextVideoIndex: number;
  previousVideoThumbnail: string;
  nextVideoThumbnail: string;
  currentVideoId: string;
  videoArray = [{title: "bladee & ECCO2K - Obedient", thumbnail: "https://i.ytimg.com/vi/2KkMyDSrBVI/default.jpg", artist:"Bladee", videoId: "2KkMyDSrBVI"}];
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

  nextAndPrevSetter = ()=>{
    this.nextVideoIndex = this.currentVideoIndex;
    this.previousVideoIndex = this.currentVideoIndex;
    if(this.nextVideoIndex < this.videoArray.length-1){
      this.nextVideoIndex++;
    }
    else{
      this.nextVideoIndex = 0;
    }
    if(this.previousVideoIndex > 0){
      this.previousVideoIndex--;
    }
    else{
      this.previousVideoIndex = this.videoArray.length-1;
    }
    console.log(this.currentVideoIndex);
  
    console.log(this.previousVideoIndex);
    console.log(this.nextVideoIndex);
    this.previousVideoThumbnail = this.videoArray[this.previousVideoIndex].thumbnail;
    this.nextVideoThumbnail = this.videoArray[this.nextVideoIndex].thumbnail;


  }

  setVideo = ()=>{
    this.route.queryParamMap.subscribe((params)=>{
      if(params.get('videoId')){
        let index = this.videoArray.findIndex(item=>item.videoId ===params.get('videoId'));
        if(index === -1){
          let favoriteVideos = [];
          this.turnup.getFavoriteVideos().subscribe((response)=>{
            favoriteVideos= response;
            let video = favoriteVideos.find((item)=>{
              return item.videoid === params.get('videoId');
            });
            this.videoArray.push({videoId: video.videoid, title: video.title, thumbnail: video.thumbnail, artist: video.artist});
            this.currentVideoIndex = this.videoArray.length-1;
            this.currentVideoId = this.videoArray[this.currentVideoIndex].videoId;
            this.nextAndPrevSetter();
          })

        }
        else{
          this.currentVideoIndex = index;
          this.currentVideoId = this.videoArray[this.currentVideoIndex].videoId;
          this.nextAndPrevSetter();
        }
      }
      else{
        this.currentVideoIndex = 0;
        this.currentVideoId = this.videoArray[this.currentVideoIndex].videoId;
        this.nextAndPrevSetter();
      }

    })
  }

  nextVideo = ()=>{
    if(this.currentVideoIndex<this.videoArray.length-1){
      this.currentVideoIndex++;
    }
    else{
      this.currentVideoIndex = 0;
    }
    this.nextAndPrevSetter();
    this.currentVideoId= this.videoArray[this.currentVideoIndex].videoId;
  }

  previousVideo = ()=>{
    if(this.currentVideoIndex>0){
      this.currentVideoIndex--;
    }
    else{
      this.currentVideoIndex = this.videoArray.length-1;
    }
    this.nextAndPrevSetter();
    this.currentVideoId= this.videoArray[this.currentVideoIndex].videoId;

  }

  getArtistVideos = ()=>{
    this.youtube.getVideos(this.artistName).subscribe((response)=>{
      this.videoArray = [];
      response.items.forEach((item)=>{
        this.videoArray.push({title: item.snippet.title, artist:this.artistName, videoId: item.id.videoId, thumbnail: item.snippet.thumbnails.default.url});
      })
      console.log(this.videoArray);
      this.currentVideoIndex = 0;
      this.currentVideoId= this.videoArray[this.currentVideoIndex].videoId;
      this.nextAndPrevSetter();

    
    })
  }

  addVideoToFavorites = ()=>{

    this.turnup.addToFavoriteVideos(this.videoArray[this.currentVideoIndex]).subscribe();

  }




}
