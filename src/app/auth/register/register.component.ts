import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './data-access/register.service';
import { AuthService } from '../../shared/data-access/auth.service';
import { RegisterFormComponent } from './ui/register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterFormComponent],
  template: `
    <div class="container mx-auto mt-6 bg-blue-300 w-1/3 p-2 rounded-xl">
      <app-register-form
        (register)="registerService.createUser$.next($event)"
        [status]="registerService.status()"
      />
    </div>
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
        this.router.navigate(['home']);
      }
    });
  }
}
