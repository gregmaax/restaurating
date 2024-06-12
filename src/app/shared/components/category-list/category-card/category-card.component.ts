import { Component, effect, inject, input, output } from '@angular/core';
import { DeleteRestaurant, Restaurant } from '../../../interfaces/restaurant';
import { Category, DeleteCategory } from '../../../interfaces/category';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UpdateRestaurantCommentDialogComponent } from '../../restaurant-list/update-restaurant-comment-dialog/update-restaurant-comment-dialog.component';
import { UpdateRestaurantDialogComponent } from '../../restaurant-list/update-restaurant-dialog/update-restaurant-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { UpdateCategoryDialogComponent } from '../update-category-dialog/update-category-dialog.component';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    UpdateRestaurantCommentDialogComponent,
    UpdateRestaurantDialogComponent,
    RouterLink,
    UpdateCategoryDialogComponent,
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div
      class="container overflow-hidden shadow-xl w-[250px] h-[300px] mx-auto px-6 border-[1px] bg-zinc-300 rounded-xl"
    >
      <a [routerLink]="['/categories', category().id]">
        <!-- card header -->
        <div
          class="h-[90px] px-4 py-4 border-b border-zinc-600 font-bold uppercase flex justify-center items-center text-center"
        >
          {{ category().name }}
        </div>

        <!-- card body -->
        <div class="border-b border-zinc-600 h-32 p-2 text-center">
          <!-- content goes here -->
          @if (category().description) {
            <small>{{ category().description }}</small>
          } @else {
            <small>Aucune description</small>
          }
        </div>
      </a>
      <!-- card footer -->
      <div
        class="border-zinc-600 h-[70px] text-right bottom-0 flex flex-col justify-center items-center w-full py-2"
      >
        <div class="text-center">
          <small>{{ restaurantCount() }} restaurants ajoutés.</small>
        </div>
        <div class="text-center flex flex-col gap-2">
          <div class="flex justify-center items-center gap-4">
            <app-update-category-dialog [categoryToUpdate]="category()" />
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
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CategoryCardComponent {
  category = input.required<Category>();
  restaurantCount = input.required<number>();
  deleteCategory = output<DeleteCategory>();
  confirmationService = inject(ConfirmationService);

  constructor() {}

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez-vous vraiment supprimer cette catégorie ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-check mr-2',
      acceptLabel: 'Oui',
      rejectIcon: 'pi pi-times mr-2',
      rejectLabel: 'Non',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.deleteCategory.emit(this.category().id);
      },
      reject: () => {},
    });
  }
}
