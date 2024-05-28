import { Component, input } from '@angular/core';
import { Restaurant } from '../../interfaces/restaurant';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [],
  template: `
    <ul>
      @for (restaurant of restaurants(); track restaurant.id) {
        <li>
          <span>{{ restaurant.id }}</span> -
          <span>{{ restaurant.name }}</span> -
          @if (restaurant.categoryId) {
            <span>{{ restaurant.categoryId }}</span>
          } @else {
            <span>Pas de categoryId</span>
          }
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class RestaurantListComponent {
  restaurants = input.required<Restaurant[]>();
}
