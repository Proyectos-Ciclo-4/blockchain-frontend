import { EventEmitter, Injectable, Output } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
  GoogleAuthProvider
} from '@angular/fire/auth';
import { LoginModel } from '../interfaces/LoginModel';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User | null;

  @Output() sessionActive: EventEmitter<Boolean> = new EventEmitter();

  constructor(private auth$: Auth, private router: Router) {}

  logout() {
    return signOut(this.auth$);
  }

  register({ email, password }: LoginModel): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth$, email, password);
  }

  login({ email, password }: LoginModel): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth$, email, password);
  }

  loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth$, new GoogleAuthProvider());
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth$, email);
  }
  loggedUSer(): User {
    if (this.user !== null) {
      return this.user;
    }
    alert('you must be logged in');
    this.router.navigate(['/']);
    return {} as User;
  }

  getUser() {
    return this.auth$.currentUser;
  }

  onAuthStateChanged(func: (user: User | null) => void) {
    return this.auth$.onAuthStateChanged(func);
  }
}
