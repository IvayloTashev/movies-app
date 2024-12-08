import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../types/user';
import { ApiService } from '../../../services/api.service';
import { of, switchMap } from 'rxjs';
import { Movie } from '../../../types/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userData: User | null = null;
  userMovies: Movie[] | null = null;

  constructor(private userService: UserService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.userService.user$
      .pipe(
        switchMap((user) => {
          this.userData = user;
          return user?._id
            ? this.apiService.getMoviesByUserId(user._id)
            : of([]);
        })
      )
      .subscribe((movies) => {
        this.userMovies = movies
      });
  }
}
