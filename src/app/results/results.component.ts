import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistListComponent } from '../artist-list/artist-list.component';
import { LastFmService } from '../last-fm.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  searchResults: any = [];
  similar: any = [];

  constructor(private lastFm: LastFmService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSearchResults();
  }

  getSearchResults= ()=>{
    this.route.queryParamMap.subscribe((params)=>{
      this.lastFm.getArtists(params.get('artist')).subscribe((response)=>{
        this.searchResults = response.results.artistmatches.artist.splice(0,10);
        // this.lastFm.getArtistInfoByName(this.searchResults[0].name).subscribe((response)=>{
        //   this.similar = response.artist.similar.artist;
        //   console.log(this.similar);
        // })
      })
    })
  }

  goToArtist = (artist: string)=>{
    this.router.navigate(['artist'],{
      queryParams:{
        name: artist
      }
    })
  }


}
