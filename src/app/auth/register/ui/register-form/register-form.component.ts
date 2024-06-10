import { Component, inject, input, output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '../../../../shared/interfaces/credentials';
import { passwordMatchesValidator } from '../../utils/password-matches';
import { RegisterStatus } from '../../data-access/register.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ButtonModule,
  ],
  template: ` <form
    [formGroup]="registerForm"
    (ngSubmit)="onSubmit()"
    #form="ngForm"
    class="px-2"
  >
    <div class="flex flex-col gap-1">
      <label for="email">Email</label>
      <input
        pInputText
        id="email"
        aria-describedby="email-help"
        formControlName="email"
      />
      @if (
        (registerForm.controls.email.dirty || form.submitted) &&
        !registerForm.controls.email.valid
      ) {
        <small>Entrez un email valide.</small>
      }
    </div>
    <div class="flex flex-col gap-1 mt-2">
      <label for="password">Mot de passe</label>
      <p-password
        [toggleMask]="true"
        id="password"
        aria-describedby="password-help"
        formControlName="password"
        promptLabel="Entrez un mot de passe"
        weakLabel="Faible"
        mediumLabel="Moyen"
        strongLabel="Fort"
      />
      @if (
        (registerForm.controls.email.dirty || form.submitted) &&
        !registerForm.controls.email.valid
      ) {
        <small>Le mot de passe doit contenir 8 caractères minimum.</small>
      }
    </div>
    <div class="flex flex-col gap-1 mt-2">
      <label for="confirm-password">Confirmer mot de passe</label>
      <p-password
        [toggleMask]="true"
        id="confirm-password"
        aria-describedby="confirm-password-help"
        formControlName="confirmPassword"
      />
      @if (
        (registerForm.controls.email.dirty || form.submitted) &&
        !registerForm.controls.email.valid
      ) {
        <small>Les mots de passe ne correspondent pas.</small>
      }
    </div>

    @if (status() === 'error') {
      <small>Could not create account with those details.</small>
    } @else if (status() === 'creating') {
      <p-progressSpinner ariaLabel="loading" styleClass="w-4rem h-4rem" />
    }

    <div class="mt-3">
      <p-button
        label="Créer mon compte"
        type="submit"
        [disabled]="status() === 'creating'"
        size="small"
      />
    </div>
  </form>`,
  styles: ``,
})
export class RegisterFormComponent {
  status = input.required<RegisterStatus>();
  register = output<Credentials>();

  private fb = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      updateOn: 'blur',
      validators: [passwordMatchesValidator],
    },
  );

  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...credentials } =
        this.registerForm.getRawValue();
      this.register.emit(credentials);
    }
  }
}
