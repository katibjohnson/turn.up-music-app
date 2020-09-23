import { Component, OnInit } from '@angular/core';
import { ArtistListComponent } from '../artist-list/artist-list.component';

@Component({
  selector: 'app-artist-grid',
  templateUrl: './artist-grid.component.html',
  styleUrls: ['./artist-grid.component.css']
})
export class ArtistGridComponent extends ArtistListComponent implements OnInit {


  ngOnInit(): void {
  }

}
