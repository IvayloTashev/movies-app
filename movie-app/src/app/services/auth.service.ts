import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../types/user';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firestoreAuth = inject(Auth);
  firestore = inject(Firestore)
  user$ = user(this.firestoreAuth);
  currentUserSig = signal<User | null | undefined>(undefined);

  register(username: string, email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firestoreAuth, email, password)
      .then(async response => {
        await updateProfile(response.user, { displayName: username });
        const userDoc = doc(this.firestore, `users/${response.user.uid}`);
        await setDoc(userDoc, {
          username: username,
          email: email,
          uid: response.user.uid
        });
      });
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firestoreAuth, email, password).then(() => { });
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firestoreAuth);
    return from(promise);
  }


}
