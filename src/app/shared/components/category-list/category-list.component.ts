import { Component, inject, input } from '@angular/core';
import { Category, DeleteCategory } from '../../interfaces/category';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { CategoryCardComponent } from './category-card/category-card.component';
import { RestaurantService } from '../../data-access/restaurant.service';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../data-access/category.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CardModule, ButtonModule, CategoryCardComponent, RouterLink],
  providers: [ConfirmationService],
  template: `
    <div class="flex flex-row flex-wrap gap-4 p-3">
      @for (category of categories(); track category.id) {
        <app-category-card
          [category]="category"
          [restaurantCount]="
            restaurantService.countRestaurantsInCategory(category.id)
          "
          (deleteCategory)="categoryService.delete$.next($event)"
        />
      }
    </div>
  `,
  styles: ``,
})
export class CategoryListComponent {
  categories = input.required<Category[]>();
  restaurantService = inject(RestaurantService);
  categoryService = inject(CategoryService);
}
