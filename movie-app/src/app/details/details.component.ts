import { Component, OnInit } from '@angular/core';
import { MoviesFirebaseService } from '../services/movies-firebase.service';
import { MovieInteface } from '../types/movie';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [YouTubePlayerModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  movie = {} as MovieInteface;
  private apiLoaded = false;

  constructor(private moviesFirebaseService: MoviesFirebaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['movieId'];

    this.moviesFirebaseService.getMovieById(movieId).subscribe((movieData) => {
      this.movie = movieData;
      console.log(this.movie);
    })

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}
