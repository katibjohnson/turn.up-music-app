import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  apiKey: string =`****`;
  baseUrl: string =`https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}`;

  // setYoutubeApiKey = (apiKey: string)=>{
  //   this.baseUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}`

  //   console.log(this.baseUrl);
  // }

  makeUrl = () => {};

  getVideos = (searchTerm: string): any => {
    return this.http.get(
      `${this.baseUrl}&maxResults=10&part=snippet&type=video&q=${searchTerm}`
    );
  };

  getVideoById = (videoId: string): any => {
    return this.http.get(
      `${this.baseUrl}&part=snippet&id=${videoId}`
    );
  };
}
