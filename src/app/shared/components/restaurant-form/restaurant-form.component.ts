import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    ReactiveFormsModule,
    NgClass,
    RatingModule,
  ],
  template: `
    <form [formGroup]="formGroup">
      <div class="flex flex-col gap-1">
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
          [ngClass]="{
            'ng-invalid ng-dirty':
              formGroup.invalid && formGroup.controls['name'].errors
          }"
        />
        @if (
          formGroup.invalid && formGroup.controls['name'].hasError('required')
        ) {
          <small class="text-red-600 text-xs ml-2"> Le nom est requis. </small>
        } @else if (
          formGroup.invalid &&
          (formGroup.controls['name'].hasError('minlength') ||
            formGroup.controls['name'].hasError('maxlength'))
        ) {
          <small class="text-red-600 text-xs ml-2">
            Le nom doit contenir entre 3 et 25 caractères...
          </small>
        }
      </div>
      <div class="flex flex-col mt-2 gap-2">
        <small
          [ngClass]="{
            'text-red-600':
              formGroup.invalid && formGroup.controls['comment'].errors
          }"
          >Qu'avez-vous pensé de ce restaurant ?</small
        >
        <textarea
          id="restaurant-comment"
          rows="2"
          cols="36"
          formControlName="comment"
          placeholder=""
          [ngClass]="{
            'ng-invalid ng-dirty':
              formGroup.invalid && formGroup.controls['comment'].errors
          }"
          pInputTextarea
        >
        </textarea>
        @if (formGroup.invalid && formGroup.controls['comment'].errors) {
          <small class="text-red-600 text-xs ml-2">
            35 caractères maximum.
          </small>
        }
      </div>
      <div class="flex flex-col gap-1">
        <label for="restaurant-rating">Note</label>
        <p-rating formControlName="rating" />
      </div>
      <div class="flex flex-col gap-1 mt-2">
        <label
          for="restaurant-city"
          [ngClass]="{
            'text-red-600':
              formGroup.invalid && formGroup.controls['city'].errors
          }"
          >Ville</label
        >
        <input pInputText id="restaurant-city" formControlName="city" />
        @if (
          formGroup.invalid && formGroup.controls['city'].hasError('required')
        ) {
          <small class="text-red-600 text-xs ml-2">
            La ville est requise.
          </small>
        }
      </div>
    </form>
  `,
  styles: `
    :host ::ng-deep .p-rating-icon:not(.p-rating-cancel),
    :host ::ng-deep .p-rating-icon:not(.p-rating-cancel):hover {
      color: goldenrod !important;
      width: 20px !important;
      height: 20px !important;
    }
  `,
})
export class RestaurantFormComponent {
  @Input() formGroup!: FormGroup;
}
