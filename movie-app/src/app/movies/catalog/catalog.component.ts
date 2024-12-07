import { Component, OnInit } from '@angular/core';
import { Movie } from '../../types/movie';
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
  pageCount: number = 0;
  paginationArray: number[] = [];

  moviesToSkip: string = '0';
  moviesToTake: string = '10';
  params: string = `?offset=${this.moviesToSkip}&pageSize=${this.moviesToTake}`

  constructor(private apiService: ApiService) { }

  setPagination() {
    this.apiService.getMovies().subscribe((movies) => {
      this.pageCount = Math.ceil(movies.length / 10);
      this.paginationArray = Array.from({ length: this.pageCount }, (_, i) => i + 1);
    });
  }

  onPageChange(page: number): void {
    const offset = (page - 1) * parseInt(this.moviesToTake, 10);
    this.params = `?offset=${offset}&pageSize=${this.moviesToTake}`;
    this.apiService.getMovies(this.params).subscribe((movies) => {
      this.moviesCollection = movies; 
    });
  }

  ngOnInit(): void {
    this.setPagination();


    this.apiService.getMovies(this.params).subscribe((movies) => {
      this.moviesCollection = movies;
    });
  }
}
