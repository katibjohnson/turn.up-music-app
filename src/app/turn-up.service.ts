import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TurnUpService {
  baseUrl: string = `http://localhost:3000`;
  constructor(private http: HttpClient) {}

  getRecent = (): any => {
    return this.http.get(`${this.baseUrl}/recent`);
  };

  getFavoriteArtists = (): any => {
    return this.http.get(`${this.baseUrl}/favorite-artists`);
  };

  getFavoriteVideos = (): any =>{
    return this.http.get(`${this.baseUrl}/favorite-videos`)
  }

  addToRecent = (artist: any): any => {
    return this.http.post(`${this.baseUrl}/recent`, artist);
  };

  deleteFromRecent = (id: number): any=>{
    return this.http.delete(`${this.baseUrl}/recent/${id}`)
  }

  addToFavoriteArtists = (artist: any): any => {
    return this.http.post(`${this.baseUrl}/favorite-artists`, artist);
  };

  deleteFromFavoriteArtists = (id: number): any => {
    return this.http.delete(`${this.baseUrl}/favorite-artists/${id}`);
  };

  addToFavoriteVideos = (video: any): any=>{
    return this.http.post(`${this.baseUrl}/favorite-videos`, video);
  }

  deleteFromFavoriteVideos = (id: number): any=>{
    return this.http.delete(`${this.baseUrl}/favorite-videos/${id}`);
  }
}
