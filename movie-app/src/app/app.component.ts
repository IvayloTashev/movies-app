import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesFirebaseService } from './services/movies-firebase.service';
import { MovieInteface } from './types/movie';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MainComponent } from "./main/main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'movie-app';

  moviesCollection: MovieInteface[] = [];

  constructor(private moviesFirebaseService: MoviesFirebaseService) { }

  ngOnInit(): void {
    this.moviesFirebaseService.getMovies().subscribe(movies => {
      this.moviesCollection = movies;
      console.log(this.moviesCollection);
    })
  }

}
