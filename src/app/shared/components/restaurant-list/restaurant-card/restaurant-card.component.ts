import { Component, Input, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DeleteRestaurant } from '../../../interfaces/restaurant';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [ButtonModule, RatingModule, FormsModule, DatePipe],
  template: `
    <div
      class="overflow-hidden shadow-md w-[250px] h-[300px] mx-auto sm:px-6 lg:px-8 border-[1px] border-blue-600 rounded"
    >
      <!-- card header -->
      <div
        class="h-[90px] px-4 py-4 bg-white border-b border-gray-200 font-bold uppercase flex justify-center items-center text-center"
      >
        {{ restaurantName() }}
      </div>

      <!-- card body -->
      <div class="bg-white border-b border-gray-200 h-32 p-10 text-center">
        <!-- content goes here -->
        @if (restaurantRating) {
          <div class="card flex justify-center items-center">
            <p-rating
              [(ngModel)]="restaurantRating"
              [readonly]="true"
              [cancel]="false"
            />
          </div>
        } @else {
          <small>Aucune note</small>
        }
      </div>

      <!-- card footer -->
      <div
        class="bg-white border-gray-200 h-[70px] text-right bottom-0 flex justify-center items-center w-full py-2"
      >
        <div class="text-center flex flex-col gap-2">
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
          <small> Mis à jour le {{ lastUpdatedAt() | date }}.</small>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class RestaurantCardComponent {
  @Input() restaurantRating: number | undefined;
  restaurantName = input.required<string>();
  restaurantId = input.required<DeleteRestaurant>();
  lastUpdatedAt = input<number>();
  deleteRestaurant = output<DeleteRestaurant>();
  protected readonly console = console;
}
