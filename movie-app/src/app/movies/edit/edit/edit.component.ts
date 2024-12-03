import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../../types/movie';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  movie = {} as Movie;
  movieId: string = '';

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['movieId'];
    this.movieId = id;

    this.apiService.getMovieById(this.movieId).subscribe((movieData) => {
      this.movie = movieData;
    })

  }

  editMovie(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    const { title, description, image, trailer, rating, genre, director } = form.value;

    this.apiService.editMovie(title, description, image, trailer, rating, genre, director, this.movieId)
      .subscribe(() => {
        this.router.navigate([`/catalog/${this.movieId}`])
      });
  }
}
