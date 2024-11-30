import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<User | null>(null);
  private user$ = this.user$$.asObservable();

  user: User | null = null;
  usersubscription: Subscription | null = null;

  get IsLogged(): boolean {
    return !!this.user;
  }

  url = 'http://localhost:3030/users'

  constructor(private http: HttpClient) {
    this.usersubscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${this.url}/login`, {email, password})
    .pipe(tap((user) => this.user$$.next(user)));
  }

  register(username: string, email: string, password: string) {
    return this.http.post<User>(`${this.url}/register`, {username, email, password})
    .pipe(tap((user) => this.user$$.next(user)));
  }
}
