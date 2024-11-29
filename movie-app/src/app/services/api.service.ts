import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Movie } from '../types/movie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getMovies() {
    let url = `${environment.apiUrl}/movies`;
    return this.http.get<Movie[]>(url);
  }

  getMovieById(id: string) {
    let url = `${environment.apiUrl}/movies/${id}`;
    return this.http.get<Movie>(url);
  }

}
