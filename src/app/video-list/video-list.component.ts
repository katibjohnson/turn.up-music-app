import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TurnUpService } from '../turn-up.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
  @Input() list: any[];
  @Output() favoriteVideoEvent = new EventEmitter<any>();
  @Output() changeVideoEvent = new EventEmitter<any>();
  constructor(
    public router: Router,
    private turnup: TurnUpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  goToArtist = (videoInfo: any) => {
    this.changeVideoEvent.emit(videoInfo);
    this.router.navigate(['artist'], {
      queryParams: {
        name: videoInfo.artist,
        videoId: videoInfo.videoid,
      },
    });
  };

  updateFavorites = (video: any) => {
    this.favoriteVideoEvent.emit(video);
  };
}
