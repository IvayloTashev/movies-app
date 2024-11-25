import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmailDirective } from '../../directives/email.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  login(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.authService.login(
      form.value.email, form.value.password
    ).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.code;
        console.log(this.errorMessage);
      }
    });
  }

}
