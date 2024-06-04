import { Component, inject, input } from '@angular/core';
import { Restaurant } from '../../interfaces/restaurant';
import { TableModule } from 'primeng/table';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { RestaurantService } from '../../data-access/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [TableModule, RestaurantCardComponent],
  template: `
    <div class="flex flex-row flex-wrap gap-4 p-3">
      @for (restaurant of restaurants(); track restaurant.id) {
        <a>
          <app-restaurant-card
            [restaurantName]="restaurant.name"
            [restaurantRating]="restaurant.rating"
            [restaurantId]="restaurant.id"
            (deleteRestaurant)="restaurantService.delete$.next($event)"
            [lastUpdatedAt]="restaurant.updatedAt"
          />
        </a>
      }
    </div>
  `,
  styles: ``,
})
export class RestaurantListComponent {
  restaurants = input.required<Restaurant[]>();
  restaurantService = inject(RestaurantService);
}
