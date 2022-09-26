import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { LoginModel } from '../interfaces/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth$: Auth) {}

    logout() {
      return signOut(this.auth$);
    }

    register({ email, password }: LoginModel): Promise<UserCredential> {
      return createUserWithEmailAndPassword(this.auth$, email, password);
    }

    login({ email, password }: LoginModel): Promise<UserCredential> {
      return signInWithEmailAndPassword(this.auth$, email, password);
    }

    resetPassword(email: string) {
      return sendPasswordResetEmail(this.auth$, email);
    }
  
}
