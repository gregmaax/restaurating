import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  template: `
    <h1 class="text-amber-700 underline text-5xl m-3">
      Welcome to {{ title }}!
    </h1>
    <p-button label="Clique ici" size="small" class="m-3" />

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'restaurating';
}
