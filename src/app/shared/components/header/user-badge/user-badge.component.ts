import { Component, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AuthUser } from '../../../data-access/auth.service';

@Component({
  selector: 'app-user-badge',
  standalone: true,
  imports: [AvatarModule],
  template: `
    <div class="flex items-center gap-2">
      <p-avatar
        [label]="getFirstLetter(activeUser()?.displayName)"
        [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }"
        shape="circle"
      />
      <span>{{ activeUser()?.displayName }}</span>
    </div>
  `,
  styles: ``,
})
export class UserBadgeComponent {
  activeUser = input.required<AuthUser>();

  getFirstLetter(str?: string | null) {
    if (str) {
      return str.length > 0 ? str.charAt(0).toUpperCase() : '';
    }
    return '';
  }
}
