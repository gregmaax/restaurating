import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { UserBadgeComponent } from './ui/user-badge/user-badge.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, UserBadgeComponent],
  template: `
    <header class="flex justify-evenly">
      <div class="flex items-center justify-center">
        <span class="text-amber-700">RESTAURATING</span>
      </div>
      <div class="flex items-center justify-center">
        <p-menubar [model]="items" [styleClass]="'border-none'">
          <ng-template pTemplate="item" let-item>
            <a [href]="item.url" class="p-menuitem-link">
              <span [class]="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </ng-template>
        </p-menubar>
      </div>
      <div class="flex items-center justify-center gap-2">
        <app-user-badge [username]="usermane" />
        <span class="pi pi-sign-out"></span>
      </div>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
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
  usermane = 'Justine';
}
