import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmailDirective } from '../../directives/email.directive';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  login(form: NgForm) {

    if (form.invalid) {
      return;
    }

    //TODO catch errors
    this.userService.login(form.value.email, form.value.password).subscribe((data) => {
      const token = data.accessToken;
      localStorage.setItem('token', token);
      this.router.navigate(['/']);
    })

    // this.userService.login(form.value.email, form.value.password).subscribe({
    //   next: () => {
    //     this.router.navigate(['/home']);
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.code;
    //     console.log(this.errorMessage);
    //   }
    // })

    // this.authService.login(
    //   form.value.email, form.value.password
    // ).subscribe({
    //   next: () => {
    //     this.router.navigate(['/home']);
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.code;
    //     console.log(this.errorMessage);
    //   }
    // });
  }

}
