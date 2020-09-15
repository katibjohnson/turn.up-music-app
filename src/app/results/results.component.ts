import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LastFmService } from '../last-fm.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  searchResults: any = [];

  constructor(private lastFm: LastFmService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSearchResults();
  }

  getSearchResults= ()=>{
    this.route.queryParamMap.subscribe((params)=>{
      this.lastFm.getArtists(params.get('artist')).subscribe((response)=>{
        this.searchResults = response.results.artistmatches.artist;
        console.log(this.searchResults);
      })
    })
  }


}
