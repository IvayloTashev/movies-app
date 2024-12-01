import { Component, OnInit } from '@angular/core';
import { Movie} from '../../types/movie';
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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMovies().subscribe((movies) => {
      this.moviesCollection = movies;
    })
  }
}
