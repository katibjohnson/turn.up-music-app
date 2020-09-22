import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TurnUpService {
  private readonly BASE_URL = environment.apiBaseUrl;
  baseUrl: string = `http://localhost:3000`;
  constructor(private http: HttpClient) {}



  getRecent = (): any => {
    return this.http.get(`${this.BASE_URL}/recent`);
  };

  getFavoriteArtists = (): any => {
    return this.http.get(`${this.BASE_URL}/favorite-artists`);
  };

  getFavoriteVideos = (): any =>{
    return this.http.get(`${this.BASE_URL}/favorite-videos`)
  }

  addToRecent = (artist: any): any => {
    return this.http.post(`${this.BASE_URL}/recent`, artist);
  };

  deleteFromRecent = (id: number): any=>{
    return this.http.delete(`${this.BASE_URL}/recent/${id}`)
  }

  addToFavoriteArtists = (artist: any): any => {
    return this.http.post(`${this.BASE_URL}/favorite-artists`, artist);
  };

  deleteFromFavoriteArtists = (id: number): any => {
    return this.http.delete(`${this.BASE_URL}/favorite-artists/${id}`);
  };

  addToFavoriteVideos = (video: any): any=>{
    return this.http.post(`${this.BASE_URL}/favorite-videos`, video);
  }

  deleteFromFavoriteVideos = (id: number): any=>{
    return this.http.delete(`${this.BASE_URL}/favorite-videos/${id}`);
  }
}
