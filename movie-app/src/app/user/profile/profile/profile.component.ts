import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData: User | null = null;

  constructor() { }

  // ngOnInit(): void {
  //   this.authService.user$.subscribe((data: User | null) => {
  //     this.userData = data;       
  //   })
  // }

}
