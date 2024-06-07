import { Component, inject, Input, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DeleteRestaurant, Restaurant } from '../../../interfaces/restaurant';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UpdateRestaurantDialogComponent } from '../update-restaurant-dialog/update-restaurant-dialog.component';
import { UpdateRestaurantCommentDialogComponent } from '../update-restaurant-comment-dialog/update-restaurant-comment-dialog.component';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [
    ButtonModule,
    RatingModule,
    FormsModule,
    DatePipe,
    ConfirmDialogModule,
    ToastModule,
    UpdateRestaurantDialogComponent,
    UpdateRestaurantCommentDialogComponent,
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div
      class="overflow-hidden shadow-md w-[250px] h-[300px] mx-auto sm:px-6 lg:px-8 border-[1px] border-blue-600 rounded"
    >
      <!-- card header -->
      <div
        class="h-[90px] px-4 py-4 bg-white border-b border-gray-200 font-bold uppercase flex justify-center items-center text-center"
      >
        {{ restaurant().name }}
      </div>

      <!-- card body -->
      <div class="bg-white border-b border-gray-200 h-32 p-10 text-center">
        <!-- content goes here -->
        @if (restaurant().rating) {
          <div class="card flex justify-center items-center">
            <p-rating
              [(ngModel)]="restaurant().rating"
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
            <app-update-restaurant-comment-dialog
              [restaurantToUpdate]="restaurant()"
            />
            <app-update-restaurant-dialog [restaurantToUpdate]="restaurant()" />
            <div>
              <p-confirmDialog />
              <p-button
                size="small"
                icon="pi pi-trash"
                severity="danger"
                [rounded]="true"
                [text]="true"
                (click)="confirmDelete($event)"
              />
            </div>
          </div>
          <small> Mis à jour le {{ lastUpdatedAt() | date }}.</small>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class RestaurantCardComponent {
  restaurant = input.required<Restaurant>();
  lastUpdatedAt = input<number>();
  deleteRestaurant = output<DeleteRestaurant>();
  protected readonly console = console;

  confirmationService = inject(ConfirmationService);

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez-vous vraiment supprimer ce restaurant ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-check mr-2',
      acceptLabel: 'Oui',
      rejectIcon: 'pi pi-times mr-2',
      rejectLabel: 'Non',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.deleteRestaurant.emit(this.restaurant().id);
      },
      reject: () => {},
    });
  }
}
