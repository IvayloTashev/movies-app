import { Component, OnInit } from '@angular/core';
import { Movie, MovieInteface } from '../../types/movie';
import { MoviesFirebaseService } from '../../services/movies-firebase.service';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {

  moviesCollection: Movie[] = [];

  constructor(private moviesFirebaseService: MoviesFirebaseService, private apiService: ApiService) { }

  // ngOnInit(): void {
  //   this.moviesFirebaseService.getMovies().subscribe(movies => {
  //     this.moviesCollection = movies;
  //   })
  // }

  ngOnInit(): void {
    this.apiService.getMovies().subscribe((movies) => {
      this.moviesCollection = movies;
    })
  }
}
