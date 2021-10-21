import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../models/genre';
import {  Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GenresMoviesService {
  
 

  constructor(private http: HttpClient) { }

  getGenres() : Observable<Genre[]>{
    return this.http.get<Genre[]>('http://localhost:8080/api/genres');
  }
  
  addGenre(genre: Genre) {
    this.http.post<Genre>('http://localhost:8080/api/genres', genre).subscribe();
  }
}
