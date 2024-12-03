import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<User | null>(null);
  user$ = this.user$$.asObservable();

  user: User | null = null;
  usersubscription: Subscription | null = null;

  get IsLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.usersubscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  login(email: string, password: string) {
    return this.http.post<User>(`/api/users/login`, { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(username: string, email: string, password: string) {
    return this.http.post<User>(`/api/users/register`, { username, email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http.get('/api/users/logout', {})
      .pipe(
        tap((user) => {
          localStorage.removeItem('X-Authorization');
          this.user$$.next(null);
        })
      );
  }

  getUserProfile() {
    return this.http
      .get<User>('/api/users/me')
      .pipe(tap((user) => this.user$$.next(user)));
  }
}
