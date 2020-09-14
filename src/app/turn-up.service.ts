import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnUpService {
  baseUrl: string = `http://localhost:3000`
  constructor(private http: HttpClient) { }

  getRecent = (): any =>{
    return this.http.get(`${this.baseUrl}/recent`);
  }
}
