import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../types/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //MOVIES

  getMovies() {
    return this.http.get<Movie[]>(`/api/data/movies`);
  };

  getMovieById(id: string) {
    return this.http.get<Movie>(`/api/data/movies/${id}`);
  };

  createMovie(
    title: string,
    description: string,
    img: string,
    trailer: string,
    rating: string,
    genre: string,
    director: string,
  ) {
    return this.http.post<Movie>(`/api/data/movies`, { title, description, img, trailer, rating, genre, director });
  };

  editMovie(
    title: string,
    description: string,
    img: string,
    trailer: string,
    rating: string,
    genre: string,
    director: string,
    movieId: string
  ) {
    return this.http.put<Movie>(`/api/data/movies/${movieId}`, { title, description, img, trailer, rating, genre, director });
  };

  deleteMovie(movieId: string) {
    return this.http.delete(`/api/data/movies/${movieId}`);
  }

    //COMMENTS

  getAllComments(movieId: string): Observable<Comment[]> {
    const encodedMovieId = encodeURIComponent(`movieId="${movieId}"`);
    const loadParam = encodeURIComponent('author=_ownerId:users');
    const url = `/api/data/comments?where=${encodedMovieId}&load=${loadParam}`;
    return this.http.get<Comment[]>(url);
  }

}
