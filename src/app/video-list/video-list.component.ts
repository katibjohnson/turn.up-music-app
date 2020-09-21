import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TurnUpService } from '../turn-up.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  @Input() list:any[];
  @Output() favoriteVideoEvent = new EventEmitter<void>();
  constructor(private router: Router, private turnup: TurnUpService) { }

  ngOnInit(): void {
  }

  goToArtist = (videoInfo: any)=>{
    this.router.navigate(['artist'], {
      queryParams:{
        name:videoInfo.artist,
        videoId: videoInfo.videoid
      }
    })
  }

  
  updateFavorites = ()=>{
    this.favoriteVideoEvent.emit();
  }
}
