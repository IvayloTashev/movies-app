import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmailDirective } from '../../directives/email.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  register(form: NgForm) {

    console.log(this.errorMessage);
    
    if (form.invalid) {
      return;
    }

    this.authService.register(
      form.value.username, form.value.email, form.value.password
    ).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    });
  }

}
