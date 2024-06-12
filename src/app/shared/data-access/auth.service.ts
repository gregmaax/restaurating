import { computed, inject, Injectable, signal } from '@angular/core';
import { AUTH } from '../../app.config';
import { authState } from 'rxfire/auth';
import { merge, map, defer, from, switchMap } from 'rxjs';
import { connect } from 'ngxtension/connect';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import { Credentials, SignInCredentials } from '../interfaces/credentials';
import { Router } from '@angular/router';

export type AuthUser = User | null | undefined;

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(AUTH);
  router = inject(Router);

  //sources
  private user$ = authState(this.auth);

  //state
  private state = signal<AuthState>({
    user: undefined,
  });

  //selectors
  user = computed(() => this.state().user);

  constructor() {
    const nextState$ = merge(this.user$.pipe(map((user) => ({ user }))));

    connect(this.state).with(nextState$);
  }

  login(credentials: SignInCredentials) {
    return from(
      defer(() =>
        signInWithEmailAndPassword(
          this.auth,
          credentials.email,
          credentials.password,
        ),
      ),
    );
  }

  logout() {
    signOut(this.auth);
    this.router.navigate(['home']);
  }

  createAccount(credentials: Credentials) {
    return from(
      defer(() =>
        createUserWithEmailAndPassword(
          this.auth,
          credentials.email,
          credentials.password,
        ),
      ),
    ).pipe(
      switchMap((result) =>
        from(
          updateProfile(result.user, { displayName: credentials.displayName }),
        ).pipe(
          map(() => {
            return result;
          }),
        ),
      ),
    );
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(defer(() => signInWithPopup(this.auth, provider)));
  }
}
