import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../types/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // -------------------------------------- APIs for MOVIES --------------------------------------
  getMoviesByUserId(userId: string): Observable<Movie[]> {
    const encodedMovieId = encodeURIComponent(`_ownerId="${userId}"`);
    const url = `/api/data/movies?where=${encodedMovieId}`;
    return this.http.get<Movie[]>(url);
  }

  getMovies(params?: string) {
    let url = '/api/data/movies'

    if (params) {
      url += params;
    }

    return this.http.get<Movie[]>(url);
  };

  getLastAddedMovies() {
    return this.http.get<Movie[]>(`/api/data/movies?sortBy=_createdOn%20desc&offset=0&pageSize=3`);
  }

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

  // --------------------------------------APIs for COMMENTS --------------------------------------
  getCommentsByMovieId(movieId: string): Observable<Comment[]> {
    const encodedMovieId = encodeURIComponent(`movieId="${movieId}"`);
    const loadParam = encodeURIComponent('author=_ownerId:users');
    const url = `/api/data/comments?where=${encodedMovieId}&load=${loadParam}`;
    return this.http.get<Comment[]>(url);
  }

  createComment(movieId: string, content: string): Observable<Comment> {
    return this.http.post<Comment>('/api/data/comments', { movieId, content });
  }

  updateComment(commentId: string, content: string): Observable<Comment> {
    return this.http.patch<Comment>(`/api/data/comments/${commentId}`, { content });
  }

  deleteComment(commentId: string): Observable<Comment> {
    return this.http.delete<Comment>(`/api/data/comments/${commentId}`)
  }
}
