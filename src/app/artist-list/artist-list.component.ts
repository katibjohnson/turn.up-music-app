import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
})
export class ArtistListComponent implements OnInit {
  @Input() list: any[];

  constructor(public router: Router) {}

  ngOnInit(): void {}

  goToArtist = (artist: string) => {
    this.router.navigate(['artist'], {
      queryParams: {
        name: artist,
      },
    });
  };
}
