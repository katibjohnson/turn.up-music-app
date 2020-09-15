import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {
  

  constructor(private http: HttpClient, private router: Router) { }

  makeUrl = (method:string):string=>{
    return `http://ws.audioscrobbler.com/2.0/?api_key=c273927229fe0ba2518dfbff80098837&format=json&method=${method}`;
  }

  getArtists=(searchTerm): any=>{
    return this.http.get(`${this.makeUrl(`artist.search`)}&artist=${searchTerm}`);
  }

  getTopArtists = (): any=>{
    return this.http.get(`${this.makeUrl(`chart.gettopartists`)}`);
  }

  getArtistInfoByMbid = (mbid: string): any=>{
    return this.http.get(`${this.makeUrl(`artist.getinfo`)}&mbid=${mbid}`);
  }

  getArtistInfoByName = (name: string): any=>{
    return this.http.get(`${this.makeUrl(`artist.getinfo`)}&artist=${name}`);
  }

  getArtistTopAlbums = (name: string): any=>{
    return this.http.get(`${this.makeUrl(`artist.gettopalbums`)}&artist=${name}`)
  }

}
