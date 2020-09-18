import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {
  @Input() videoInfo: any;
  @Output() videoClicked = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  goToArtist = ()=>{
    this.videoClicked.emit(this.videoInfo);
  }

}
