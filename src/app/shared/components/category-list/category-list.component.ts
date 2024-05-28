import { Component, inject, input } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { CategoryCardComponent } from './category-card/category-card.component';
import { RestaurantService } from '../../data-access/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CardModule, ButtonModule, StyleClassModule, CategoryCardComponent],
  template: `
    <div class="flex flex-row gap-4">
      @for (category of categories(); track category.id) {
        <a href="/">
          <app-category-card
            [categoryName]="category.name"
            [categoryDesc]="category.description"
            [restaurantCount]="
              restaurantService.countRestaurantsInCategory(category.id)
            "
          />
        </a>
      }
    </div>
  `,
  styles: ``,
})
export class CategoryListComponent {
  categories = input.required<Category[]>();
  restaurantService = inject(RestaurantService);
}
