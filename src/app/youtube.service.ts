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
    return this.http.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyD-6Nl2tHtsqnNnjcOueG2ZQnQtnHm1J6k&part=snippet&type=video&q=${searchTerm}`);
  }
}
