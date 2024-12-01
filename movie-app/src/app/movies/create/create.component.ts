import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor(private apiService: ApiService, private router: Router) { }

  addMovie(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { title, description, image, trailer, rating, genre, director } = form.value;

    this.apiService.createMovie(title, description, image, trailer, rating, genre, director)
      .subscribe(() => {
        this.router.navigate(['/catalog'])
      });

  }
}
