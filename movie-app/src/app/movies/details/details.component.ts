import { Component, OnInit } from '@angular/core';
import { Movie } from '../../types/movie';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player'
import { ApiService } from '../../services/api.service';
import { SplitStringPipe } from '../../shared/pipes/split-string.pipe';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [YouTubePlayerModule, SplitStringPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  movie = {} as Movie;
  private apiLoaded = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['movieId'];

    this.apiService.getMovieById(movieId).subscribe((movieData) => {
      this.movie = movieData;
    })

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}
