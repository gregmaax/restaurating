import { Component, computed, inject } from '@angular/core';
import { RestaurantListComponent } from '../shared/components/restaurant-list/restaurant-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../shared/data-access/category.service';
import { RestaurantService } from '../shared/data-access/restaurant.service';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
import { AddRestaurantDialogComponent } from '../shared/components/add-restaurant-dialog/add-restaurant-dialog.component';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    RestaurantListComponent,
    ButtonModule,
    AddRestaurantDialogComponent,
  ],
  template: `
    <div class="container w-full mx-auto my-12 flex flex-col gap-6">
      <div class="flex flex-row gap-2">
        <p-button
          severity="contrast"
          label="Retour"
          size="small"
          (onClick)="location.back()"
          [raised]="true"
        />
        <app-add-restaurant-dialog />
      </div>
      @if (
        restaurantService.getRestaurantsByCategory(category()?.id).length > 0
      ) {
        <app-restaurant-list
          [restaurants]="
            restaurantService.getRestaurantsByCategory(category()?.id)
          "
        />
      } @else {
        <span>Aucun restaurant ajouté.</span>
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
