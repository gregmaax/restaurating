import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, map, merge, Subject, switchMap } from 'rxjs';
import { AuthService } from '../../../shared/data-access/auth.service';
import { SignInCredentials } from '../../../shared/interfaces/credentials';
import { connect } from 'ngxtension/connect';

export type SignInStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface SignInState {
  status: SignInStatus;
}

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private authService = inject(AuthService);

  // sources
  error$ = new Subject<any>();
  signIn$ = new Subject<SignInCredentials>();
  googleSignIn$ = new Subject();

  userAuthenticated$ = merge(
    this.signIn$.pipe(
      switchMap((credentials) =>
        this.authService.login(credentials).pipe(
          catchError((err) => {
            this.error$.next(err);
            return EMPTY;
          }),
        ),
      ),
    ),
    this.googleSignIn$.pipe(
      switchMap(() =>
        this.authService.signInWithGoogle().pipe(
          catchError((err) => {
            this.error$.next(err);
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  // state
  private state = signal<SignInState>({
    status: 'pending',
  });

  // selectors
  status = computed(() => this.state().status);

  constructor() {
    // reducers
    const nextState$ = merge(
      this.userAuthenticated$.pipe(map(() => ({ status: 'success' as const }))),
      this.signIn$.pipe(map(() => ({ status: 'authenticating' as const }))),
      this.googleSignIn$.pipe(
        map(() => ({ status: 'authenticating' as const })),
      ),
      this.error$.pipe(map(() => ({ status: 'error' as const }))),
    );

    connect(this.state).with(nextState$);
  }
}
