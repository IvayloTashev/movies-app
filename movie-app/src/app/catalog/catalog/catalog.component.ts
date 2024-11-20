import { Component, OnInit } from '@angular/core';
import { MovieInteface } from '../../types/movie';
import { MoviesFirebaseService } from '../../services/movies-firebase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {

  moviesCollection: MovieInteface[] = [];

  constructor(private moviesFirebaseService: MoviesFirebaseService) { }

  ngOnInit(): void {
    this.moviesFirebaseService.getMovies().subscribe(movies => {
      this.moviesCollection = movies;
    })
  }
}
