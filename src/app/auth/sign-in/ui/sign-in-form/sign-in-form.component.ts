import { Component, inject, input, output } from '@angular/core';
import {
  Credentials,
  SignInCredentials,
} from '../../../../shared/interfaces/credentials';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SignInStatus } from '../../data-access/sign-in.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  template: `
    <form
      [formGroup]="signInForm"
      (ngSubmit)="signIn.emit(signInForm.getRawValue())"
      #form="ngForm"
    >
      <div class="flex flex-col gap-1">
        <label for="email">Email</label>
        <input
          pInputText
          id="email"
          aria-describedby="email-help"
          formControlName="email"
          variant="filled"
        />
      </div>
      <div class="flex flex-col gap-1 mt-2">
        <label for="password">Mot de passe</label>
        <p-password
          id="password"
          aria-describedby="password-help"
          formControlName="password"
          [feedback]="false"
          variant="filled"
        />
      </div>

      @if (signInStatus() === 'error') {
        <small>Invalide. Réessayez.</small>
      }
      @if (signInStatus() === 'authenticating') {
        <p-progressSpinner ariaLabel="loading" styleClass="w-4rem h-4rem" />
      }

      <div class="mt-6 flex flex-row text-center gap-2">
        <p-button
          severity="contrast"
          label="Se connecter"
          type="submit"
          [disabled]="signInStatus() === 'authenticating'"
          size="small"
        />
        <p-button
          severity="contrast"
          label="Continuer avec Google"
          icon="pi pi-google"
          (onClick)="googleSignIn.emit()"
          [disabled]="signInStatus() === 'authenticating'"
          size="small"
        />
      </div>
    </form>
  `,
  styles: ``,
})
export class SignInFormComponent {
  signInStatus = input.required<SignInStatus>();
  signIn = output<SignInCredentials>();
  googleSignIn = output();

  private fb = inject(FormBuilder);

  signInForm = this.fb.nonNullable.group({
    email: [''],
    password: [''],
  });
}
