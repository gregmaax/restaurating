import { Component, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-user-badge',
  standalone: true,
  imports: [AvatarModule],
  template: `
    <div class="flex items-center justify-center">
      <p-avatar
        [label]="getFirstLetter(username())"
        styleClass="mr-2"
        [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }"
        shape="circle"
      />
      <span>{{ username() }}</span>
    </div>
  `,
  styles: ``,
})
export class UserBadgeComponent {
  username = input.required<string>();

  getFirstLetter(str: string): string {
    return str.length > 0 ? str.charAt(0) : '';
  }
}
