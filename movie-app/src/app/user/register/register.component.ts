import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmailDirective } from '../../directives/email.directive';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string | null = null;

  constructor(private router: Router, private userService: UserService) { }

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    //TODO catch backend errors
    this.userService.register(form.value.username, form.value.email, form.value.password).subscribe((data) => {
      const token = data.accessToken;
      localStorage.setItem('X-Authorization', token);
      this.router.navigate(['/']);
    })

  }

}
