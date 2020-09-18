import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  @Input() list:any[];
  constructor(private router: Router) { }

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

}
