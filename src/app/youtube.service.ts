import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  makeUrl = () =>{

  }

  getVideos = (searchTerm:string): any=>{
    return this.http.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCbSE1rJLqBA7ULy3L7LENrMNkZxeUwnlA&part=snippet&q=${searchTerm}`);
  }
}
