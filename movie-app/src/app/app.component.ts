import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthService } from './services/auth.service';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-app';

  constructor(private authService: AuthService) { }

  // ngOnInit(): void {
  //   this.authService.user$.subscribe((user: User) => {
  //     if (user) {
  //       this.authService.currentUserSig.set({
  //         email: user.email,
  //         username: user.username,
  //       });
  //     } else {
  //       this.authService.currentUserSig.set(null);
  //     }
  //   })
  // }

}
