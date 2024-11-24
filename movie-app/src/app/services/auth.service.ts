import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firestoreAuth = inject(Auth);
  user$ = user(this.firestoreAuth);
  currentUserSig = signal<User | null | undefined>(undefined);

  register(username: string, email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firestoreAuth, email, password
    ).then(response => 
      updateProfile(response.user, { displayName: username }));

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firestoreAuth,
      email,
      password
    ).then(() => {});

    return from(promise);
  }

  logout():Observable<void> {
    const promise = signOut(this.firestoreAuth);
    return from(promise);
  }
}
