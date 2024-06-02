import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DeleteRestaurant } from '../../../interfaces/restaurant';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div
      class="overflow-hidden shadow-md w-[250px] h-[280px] mx-auto sm:px-6 lg:px-8 border-[1px] border-blue-600 rounded"
    >
      <!-- card header -->
      <div
        class="px-6 py-4 bg-white border-b border-gray-200 font-bold uppercase text-center"
      >
        {{ restaurantName() }}
      </div>

      <!-- card body -->
      <div class="bg-white border-b border-gray-200 h-32 p-2 text-center">
        <!-- content goes here -->
        @if (restaurantRating()) {
          <small>{{ restaurantRating() }}</small>
        } @else {
          <small>Aucune note</small>
        }
      </div>

      <!-- card footer -->
      <div
        class="bg-white border-gray-200 h-[70px] text-right bottom-0 flex justify-center items-center w-full py-3"
      >
        <div class="text-center flex flex-col gap-3">
          <div class="flex justify-center items-center gap-4">
            <p-button
              size="small"
              icon="pi pi-pencil"
              [rounded]="true"
              [text]="true"
              (click)="console.log('update button')"
            />
            <p-button
              size="small"
              icon="pi pi-trash"
              severity="danger"
              [rounded]="true"
              [text]="true"
              (click)="deleteRestaurant.emit(restaurantId())"
            />
          </div>
          <small> Mis à jour le 02/06.</small>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class RestaurantCardComponent {
  restaurantName = input.required<string>();
  restaurantRating = input<number>();
  restaurantId = input.required<DeleteRestaurant>();
  deleteRestaurant = output<DeleteRestaurant>();
  protected readonly console = console;
}
