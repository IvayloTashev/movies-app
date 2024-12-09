import { Component, OnInit } from '@angular/core';
import { Movie } from '../../types/movie';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player'
import { ApiService } from '../../services/api.service';
import { SplitStringPipe } from '../../shared/pipes/split-string.pipe';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [YouTubePlayerModule, SplitStringPipe, RouterLink, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private apiLoaded = false;
  user = {} as User | null;

  movie = {} as Movie;
  movieId: string = '';

  comments: any = [];
  isWritingComment = false;
  isEditingComment = false;
  editingCommentId: string | null = null;
  editingCommentContent: string | null = null;

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

    this.apiService.getCommentsByMovieId(this.movieId).subscribe({
      next: (commentsData) => {
        this.comments = commentsData;
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
      },
    });
  };

  deleteMovie() {
    const confirmation = confirm(`Do you want to delete this movie?`)
    if (!confirmation) {
        return;
    }

    this.apiService.deleteMovie(this.movieId).subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  };

  addCommentToggle() {
    this.isWritingComment = !this.isWritingComment
  }

  editCommentToggle(commentId: string, commentContent: string) {
    this.isEditingComment = !this.isEditingComment;

    if (this.isEditingComment) {
      this.editingCommentId = commentId;
      this.editingCommentContent = commentContent;
    } else {
      this.editingCommentId = null;
      this.editingCommentContent = null;
    }
  }

  addComment(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.apiService.createComment(this.movieId, form.value.comment).subscribe(() => {
      this.apiService.getCommentsByMovieId(this.movieId).subscribe((commentsData) => {
        this.comments = commentsData;
      });

      this.addCommentToggle();
    });
  }

  updateComment(editForm: NgForm) {
    if (editForm.invalid || !this.editingCommentId) {
      return;
    }

    const updatedContent = editForm.value.editComment;

    this.apiService.updateComment(this.editingCommentId, updatedContent).subscribe(() => {
      this.apiService.getCommentsByMovieId(this.movieId).subscribe((commentsData) => {
        this.comments = commentsData;
      });

      this.editCommentToggle('', '');
    });
  }

  deleteComment(commentId: string) {
    const confirmation = confirm(`Do you want to delete this comment?`)
    if (!confirmation) {
        return;
    }

    this.apiService.deleteComment(commentId).subscribe(() => {
      this.apiService.getCommentsByMovieId(this.movieId).subscribe((commentsData) => {
        this.comments = commentsData;
      });

    })
  }
}
