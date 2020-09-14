import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LastFmService} from '../last-fm.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchForArtist = (form: NgForm)=>{
    this.router.navigate(['results'], {
      queryParams: {
        artist: form.value.artist
      }
    })
  }
}
