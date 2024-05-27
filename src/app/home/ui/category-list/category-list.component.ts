import { Component, input } from '@angular/core';
import { Category } from '../../../shared/interfaces/category';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CardModule, ButtonModule, StyleClassModule],
  template: `
    <div class="flex flex-row gap-4">
      @for (category of categories(); track category.id) {
        <a href="/">
          <p-card [header]="category.name" [styleClass]="'w-[220px] h-[280px]'">
            <ng-template pTemplate="header">
              <div class="text-center">
                <small>0 restaurants ajoutés.</small>
              </div>
            </ng-template>
            <div>
              @if (category.description) {
                <p>{{ category.description }}</p>
              } @else {
                <p>Aucune description</p>
              }
            </div>
          </p-card>
        </a>
      }
    </div>
  `,
  styles: `
    .p-card-header {
      text-align: center;
    }
  `,
})
export class CategoryListComponent {
  categories = input.required<Category[]>();
}
