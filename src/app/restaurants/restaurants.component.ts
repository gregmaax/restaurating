import { Component, inject } from '@angular/core';
import { AddCategoryDialogComponent } from '../shared/components/add-category-dialog/add-category-dialog.component';
import { CategoryListComponent } from '../shared/components/category-list/category-list.component';
import { RestaurantListComponent } from '../shared/components/restaurant-list/restaurant-list.component';
import { RestaurantService } from '../shared/data-access/restaurant.service';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    AddCategoryDialogComponent,
    CategoryListComponent,
    RestaurantListComponent,
  ],
  template: `
    <div class="container w-full mx-auto my-12 flex flex-col gap-6">
      @if (restaurantService.restaurants().length > 0) {
        <app-restaurant-list [restaurants]="restaurantService.restaurants()" />
      } @else {
        <span>Aucun restaurant ajouté.</span>
      }
    </div>
  `,
  styles: ``,
})
export default class RestaurantsComponent {
  restaurantService = inject(RestaurantService);
}
