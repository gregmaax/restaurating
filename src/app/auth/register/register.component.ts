import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from './data-access/register.service';
import { AuthService } from '../../shared/data-access/auth.service';
import { RegisterFormComponent } from './ui/register-form/register-form.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterFormComponent, RouterLink, CardModule],
  template: `
    <p-card
      styleClass="container mx-auto mt-6 bg-zinc-300 shadow-xl w-1/3 p-4 rounded-xl"
    >
      <div class="mb-4 py-4 px-2 border-b border-zinc-600">
        <span class="font-bold text-3xl">Créer un compte</span>
      </div>
      <app-register-form
        (register)="registerService.createUser$.next($event)"
        [status]="registerService.status()"
      />
      <div class="mt-5 px-2 flex flex-row gap-2 justify-center items-center">
        <div>
          <small>Déjà inscrit ?</small>
        </div>
        <a routerLink="/auth/sign-in" class="font-semibold">
          <small>Connexion</small>
        </a>
      </div>
    </p-card>
  `,
  styles: ``,
})
export default class RegisterComponent {
  registerService = inject(RegisterService);
  authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['categories']);
      }
    });
  }
}
