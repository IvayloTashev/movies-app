import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private router: Router, private userService: UserService) { }

  login(form: NgForm) {

    if (form.invalid) {
      return;
    }

    //TODO catch backend errors
    this.userService.login(form.value.email, form.value.password).subscribe((data) => {
      const token = data.accessToken;
      localStorage.setItem('X-Authorization', token);
      this.router.navigate(['/']);
    })

  }

}
