import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { MovieInteface } from '../types/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesFirebaseService {
  firestore = inject(Firestore);
  moviesCollection = collection(this.firestore, 'movies');

  getMovies(): Observable<MovieInteface[]> {
    return collectionData(this.moviesCollection, {
      idField: 'id'
    })
  }

  getMovieById(movieId: string): Observable<MovieInteface> {
    const movieDocRef = doc(this.firestore, `movies/${movieId}`);
    return docData(movieDocRef, { idField: 'id' });
  }

  addMovie(movie: MovieInteface): Observable<string> {
    const promise = addDoc(this.moviesCollection, movie).then(
      (response) => response.id
    );
    return from(promise);
  }

}
