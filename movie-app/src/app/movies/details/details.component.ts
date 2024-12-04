import { Component, OnInit } from '@angular/core';
import { Movie } from '../../types/movie';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player'
import { ApiService } from '../../services/api.service';
import { SplitStringPipe } from '../../shared/pipes/split-string.pipe';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [YouTubePlayerModule, SplitStringPipe, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  movie = {} as Movie;
  user = {} as User | null;
  movieId: string = '';

  //TODO remove Any type
  comments: any = [];
  
  private apiLoaded = false;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const user = this.userService.user$.subscribe((userData) => {
      this.user = userData;
    })
    
    const id = this.activatedRoute.snapshot.params['movieId'];
    this.movieId = id;

    this.apiService.getMovieById(this.movieId).subscribe((movieData) => {
      this.movie = movieData;
    })

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    this.apiService.getAllComments(this.movieId).subscribe({
      next: (commentsData) => {
        this.comments = commentsData;
        console.log(this.comments);
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
      },
    });
  };

  deleteMovie() {
    this.apiService.deleteMovie(this.movieId).subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  };
}
