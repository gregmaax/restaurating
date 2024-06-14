import { Component, input, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { SelectCategory } from '../../../../interfaces/category';

@Component({
  selector: 'app-restaurant-name-rating-form',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    RatingModule,
    ReactiveFormsModule,
    NgClass,
  ],
  template: `
    <form [formGroup]="formGroup">
      <div class="flex flex-col items-start gap-1">
        <label
          [ngClass]="{
            'text-red-600':
              formGroup.invalid && formGroup.controls['name'].errors
          }"
          for="restaurant-name"
          >Nom</label
        >
        <input
          pInputText
          id="restaurant-name"
          formControlName="name"
          class="w-full"
          [ngClass]="{
            'ng-invalid ng-dirty':
              formGroup.invalid && formGroup.controls['name'].errors
          }"
        />
        @if (
          formGroup.invalid && formGroup.controls['name'].hasError('required')
        ) {
          <small class="text-red-600 text-xs ml-2">
            Le titre est requis.
          </small>
        } @else if (
          formGroup.invalid && formGroup.controls['name'].hasError('maxlength')
        ) {
          <small class="text-red-600 text-xs ml-2">
            25 caractères maximum
          </small>
        }
      </div>
      <div class="flex flex-col gap-1 mt-3">
        <label for="restaurant-category" class="flex items-start"
          >Catégorie</label
        >
        <p-dropdown
          formControlName="categoryId"
          [options]="selectCategories()"
          placeholder="Selectionnez une catégorie"
          optionLabel="name"
          optionValue="id"
          styleClass="w-full"
          id="restaurant-category"
        />
      </div>

      <div class="flex flex-col items-start mt-3 gap-1">
        <label for="restaurant-rating">Note</label>
        <p-rating formControlName="rating" />
      </div>
    </form>
  `,
  styles: ``,
})
export class RestaurantNameRatingFormComponent {
  @Input() formGroup!: FormGroup;
  //isOnRestaurantPage = input.required<boolean>();
  selectCategories = input<SelectCategory[]>();
}
