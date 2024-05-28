import { Component, computed, inject } from '@angular/core';
import { RestaurantListComponent } from '../shared/components/restaurant-list/restaurant-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../shared/data-access/category.service';
import { RestaurantService } from '../shared/data-access/restaurant.service';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [RestaurantListComponent, ButtonModule],
  template: `
    <div class="m-12 flex flex-col gap-6">
      @if (
        restaurantService.getRestaurantsByCategory(category()?.id).length > 0
      ) {
        <div class="flex flex-col gap-10">
          <div>
            <p-button label="Retour" size="small" (onClick)="location.back()" />
          </div>
          <app-restaurant-list
            [restaurants]="
              restaurantService.getRestaurantsByCategory(category()?.id)
            "
          />
        </div>
      } @else {
        <div class="flex flex-col gap-10">
          <div>
            <p-button label="Retour" size="small" (onClick)="location.back()" />
          </div>
          <span>Aucun restaurant ajouté.</span>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export default class CategoryDetailComponent {
  location = inject(Location);
  route = inject(ActivatedRoute);
  params = toSignal(this.route.paramMap);
  categoryService = inject(CategoryService);
  restaurantService = inject(RestaurantService);

  category = computed(() =>
    this.categoryService
      .categories()
      .find((category) => category.id === this.params()?.get('id')),
  );
}
