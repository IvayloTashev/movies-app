import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoadSpinnerComponent } from '../shared/load-spinner/load-spinner.component';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoadSpinnerComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: () => {
        this.isAuthenticating = false;
      },
      error: () => {
        this.isAuthenticating = false;
      },
      complete: () => {
        this.isAuthenticating = false;
      }
    })
  }
}
