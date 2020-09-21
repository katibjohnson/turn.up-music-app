import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  makeUrl = () => {};

  getVideos = (searchTerm: string): any => {
    return this.http.get(
      `https://www.googleapis.com/youtube/v3/search?key=****&part=snippet&type=video&q=${searchTerm}`
    );
  };

  getVideoById = (videoId: string): any => {
    return this.http.get(
      `https://www.googleapis.com/youtube/v3/videos?key=****&part=snippet&id=${videoId}`
    );
  };
}
