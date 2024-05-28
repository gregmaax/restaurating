import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    ReactiveFormsModule,
    NgClass,
  ],
  template: `
    <form [formGroup]="formGroup">
      <div class="flex flex-col gap-2">
        <label
          [ngClass]="{
            'text-red-600':
              formGroup.invalid &&
              formGroup.controls['name'].touched &&
              formGroup.controls['name'].errors
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
              formGroup.invalid &&
              formGroup.controls['name'].touched &&
              formGroup.controls['name'].errors
          }"
        />
        @if (
          formGroup.invalid &&
          formGroup.controls['name'].touched &&
          formGroup.controls['name'].errors
        ) {
          <small class="text-red-600 text-xs ml-2">
            Le titre doit contenir entre 3 et 25 caractères...
          </small>
        }
      </div>
      <div class="mt-2">
        <textarea
          id="restaurant-desc"
          rows="2"
          cols="36"
          formControlName="comment"
          placeholder="Comment..."
          pInputTextarea
        >
        </textarea>
      </div>
      <div class="flex flex-col gap-2">
        <label for="restaurant-address">Address</label>
        <input pInputText id="restaurant-address" formControlName="address" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="restaurant-city">City</label>
        <input pInputText id="restaurant-city" formControlName="city" />
      </div>
    </form>
  `,
  styles: ``,
})
export class RestaurantFormComponent {
  @Input() formGroup!: FormGroup;
}
