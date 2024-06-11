import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { UserBadgeComponent } from './user-badge/user-badge.component';
import { AuthService } from '../../data-access/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, UserBadgeComponent, ButtonModule],
  template: `
    <header
      class="container mx-auto flex justify-between px-6 border-b-[1px] border-zinc-600"
    >
      <div class="flex items-center justify-center">
        <span class="self-center font-semibold whitespace-nowrap"
          >RESTAURATING</span
        >
      </div>
      <div class="flex items-center justify-center ">
        <p-menubar [model]="items" [styleClass]="'border-none bg-neutral-200'">
          <ng-template pTemplate="item" let-item>
            <a [routerLink]="item.url" class="p-menuitem-link">
              <span [class]="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </ng-template>
        </p-menubar>
      </div>
      <div class="flex items-center justify-center gap-2">
        @if (authService.user()) {
          <app-user-badge [activeUser]="authService.user()" />
          <p-button
            size="small"
            icon="pi pi-sign-out"
            severity="danger"
            [rounded]="true"
            [text]="true"
            (click)="authService.logout()"
          />
        } @else {
          <span>Connexion</span>
        }
      </div>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  authService = inject(AuthService);

  items: MenuItem[] = [
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      url: '/home',
    },
    {
      label: 'Categories',
      icon: 'pi pi-list',
      url: '/categories',
    },
    {
      label: 'Classements',
      icon: 'pi pi-star',
      url: '/rankings',
    },
  ];
}
