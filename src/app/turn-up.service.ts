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

  addToRecent = (artist: any): any => {
    return this.http.post(`${this.baseUrl}/recent`, artist);
  };

  addToFavoriteArtists = (artist: any): any => {
    return this.http.post(`${this.baseUrl}/favorite-artists`, artist);
  };

  deleteFromFavoriteArtists = (id: number): any => {
    return this.http.delete(`${this.baseUrl}/favorite-artists/${id}`);
  };
}
