import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Movie } from '../types/movie';


@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements OnInit {
  lastAddedMovies: Movie[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getLastAddedMovies().subscribe((movies) => {
      this.lastAddedMovies = movies;
    })
  }
}
