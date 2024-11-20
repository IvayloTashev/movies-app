import { Component, OnInit } from '@angular/core';
import { MoviesFirebaseService } from '../services/movies-firebase.service';
import { MovieInteface } from '../types/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  movie = {} as MovieInteface;

  constructor(private moviesFirebaseService: MoviesFirebaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['movieId'];

    this.moviesFirebaseService.getMovieById(movieId).subscribe((movieData) => {
      this.movie = movieData;
      console.log(this.movie);
    })
  }

}
