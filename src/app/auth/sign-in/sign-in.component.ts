import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../shared/data-access/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SignInService } from './data-access/sign-in.service';
import { SignInFormComponent } from './ui/sign-in-form/sign-in-form.component';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    SignInFormComponent,
    ButtonModule,
    RouterLink,
    ProgressSpinnerModule,
  ],
  template: `
    <div class="container mx-auto mt-6 bg-blue-300 w-1/3 p-2 rounded-xl">
      @if (authService.user() === null) {
        <app-sign-in-form
          [signInStatus]="signInService.status()"
          (signIn)="signInService.signIn$.next($event)"
          (googleSignIn)="signInService.googleSignIn$.next($event)"
        />
        <div class="mt-3 px-2 flex flex-row gap-2 justify-center items-center">
          <div>
            <small>Pas encore de compte ?</small>
          </div>
          <a routerLink="/auth/register" class="font-semibold">
            <small>Créer un compte</small>
          </a>
        </div>
      } @else {
        <p-progressSpinner ariaLabel="loading" styleClass="w-4rem h-4rem" />
      }
    </div>
  `,
  styles: ``,
})
export default class SignInComponent {
  public signInService = inject(SignInService);
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['home']);
      }
    });
  }
}
