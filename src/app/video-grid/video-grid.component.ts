import { Component, OnInit } from '@angular/core';
import { VideoListComponent } from '../video-list/video-list.component';

@Component({
  selector: 'app-video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.css']
})
export class VideoGridComponent extends VideoListComponent implements OnInit {


  ngOnInit(): void {
  }

}
