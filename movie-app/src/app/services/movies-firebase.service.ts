import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { MovieInteface } from '../types/movie';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { FirestoreResponse } from '../types/firestore';

@Injectable({
  providedIn: 'root'
})
export class MoviesFirebaseService {
  firestore = inject(Firestore);
  authService = inject(AuthService)
  http = inject(HttpClient);
  moviesCollection = collection(this.firestore, 'movies');

  private BASE_URL = 'https://firestore.googleapis.com/v1/projects/movies-a5667/databases/(default)/documents/movies';

  // With Firestore SDK
  // getMovies(): Observable<MovieInteface[]> {
  //   return collectionData(this.moviesCollection, {
  //     idField: 'id'
  //   })
  // }

  // With REST API
  getMovies(): Observable<MovieInteface[]> {
    return this.http.get<FirestoreResponse>(this.BASE_URL).pipe(
      map(response => {
        return response.documents.map((doc: any) => {
          const fields = doc.fields;
          return {
            id: doc.name.split('/').pop(),
            title: fields.title?.stringValue,
            genre: fields.genre?.arrayValue?.values?.map((g: any) => g.stringValue),
            director: fields.director?.stringValue,
            rating: fields.rating?.stringValue,
            description: fields.description?.stringValue,
            comments: fields.comments?.arrayValue?.values?.map((c: any) => c.stringValue),
            image: fields.image?.stringValue,
            trailer: fields.trailer?.stringValue,
          };
        });
      })
    );
  }

  // With Firestore SDK
  // getMovieById(movieId: string): Observable<MovieInteface> {
  //   const movieDocRef = doc(this.firestore, `movies/${movieId}`);
  //   return docData(movieDocRef, { idField: 'id' });
  // }

  // With REST API
  getMovieById(movieId: string): Observable<MovieInteface> {
    return this.http.get<any>(`${this.BASE_URL}/${movieId}`).pipe(
      map(doc => {
        const fields = doc.fields;
  
        return {
          id: doc.name.split('/').pop(),
          title: fields.title?.stringValue,
          genre: fields.genre?.arrayValue?.values?.map((g: any) => g.stringValue),
          director: fields.director?.stringValue,
          rating: fields.rating?.stringValue,
          description: fields.description?.stringValue,
          comments: fields.comments?.arrayValue?.values?.map((c: any) => c.stringValue),
          image: fields.image?.stringValue,
          trailer: fields.trailer?.stringValue,
        };
      })
    );
  }

  addMovie(movie: MovieInteface): Observable<string> {
    const promise = addDoc(this.moviesCollection, movie).then(
      (response) => response.id
    );
    return from(promise);
  }
}
