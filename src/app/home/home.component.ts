import { Component, inject } from '@angular/core';
import { CategoryListComponent } from '../shared/components/category-list/category-list.component';
import { CategoryService } from '../shared/data-access/category.service';
import { AddCategoryDialogComponent } from '../shared/components/add-category-dialog/add-category-dialog.component';
import { RestaurantListComponent } from '../shared/components/restaurant-list/restaurant-list.component';
import { RestaurantService } from '../shared/data-access/restaurant.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategoryListComponent,
    AddCategoryDialogComponent,
    RestaurantListComponent,
  ],
  template: `
    <div class="m-12 flex flex-col gap-6">
      <app-add-category-dialog />
      <app-category-list [categories]="categoryService.categories()" />
      <hr />
      <div>
        <span> Restaurant par catégorie test </span>
        <app-restaurant-list
          [restaurants]="
            restaurantService.getRestaurantsByCategory('lReZtwEMESpGz33tunXL')
          "
        />
      </div>
      <div>
        <span>Tous les restaurants</span>
        <app-restaurant-list [restaurants]="restaurantService.restaurants()" />
      </div>
    </div>
  `,
  styles: ``,
})
export default class HomeComponent {
  categoryService = inject(CategoryService);
  restaurantService = inject(RestaurantService);
}
