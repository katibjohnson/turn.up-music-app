import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  apiKey: string = `AIzaSyDnCvvhX1AtImAAUMfZk0P7kTadBjLGtYg`;
  baseUrl: string = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}`;

  setYoutubeApiKey = (apiKey: string)=>{
    this.baseUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}`
  }

  makeUrl = () => {};

  getVideos = (searchTerm: string): any => {
    return this.http.get(
      `${this.baseUrl}&maxResults=10&part=snippet&type=video&q=${searchTerm}`
    );
  };

  getVideoById = (videoId: string): any => {
    return this.http.get(`${this.baseUrl}&part=snippet&id=${videoId}`);
  };
}
