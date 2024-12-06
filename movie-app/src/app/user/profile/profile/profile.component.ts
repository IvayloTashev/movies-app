import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../types/user';
import { ApiService } from '../../../services/api.service';
import { combineLatest, map, of, switchMap, tap } from 'rxjs';
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

  // ngOnInit(): void {
  //   this.userService.user$
  //     .pipe(
  //       tap((user) => {
  //         this.userData = user;
  //       }),
  //       switchMap((user) => {
  //         if (!user?._id) {
  //           return of({ comments: [], movies: [] });
  //         }

  //         return combineLatest([
  //           this.apiService.getCommentsByUserId(user._id),
  //           this.apiService.getMoviesByUserId(user._id),
  //         ]).pipe(
  //           map(([comments, movies]) => ({ comments, movies }))
  //         );
  //       })
  //     )
  //     .subscribe(({ comments, movies }) => {
  //       this.userComments = comments;
  //       this.userMovies = movies;
  //       console.log(this.userComments);
  //       console.log(this.userMovies);
        
  //     });
  //   }
}
