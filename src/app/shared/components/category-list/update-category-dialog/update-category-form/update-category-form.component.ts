import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-update-category-form',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputTextareaModule,
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
          for="category-name"
          >Nom</label
        >
        <input
          pInputText
          id="category-name"
          formControlName="name"
          [ngClass]="{
            'ng-invalid ng-dirty':
              formGroup.invalid &&
              formGroup.controls['name'].touched &&
              formGroup.controls['name'].errors
          }"
        />
        @if (
          formGroup.invalid && formGroup.controls['name'].hasError('required')
        ) {
          <small class="text-red-600 text-xs ml-2"> Le nom est requis. </small>
        } @else if (
          formGroup.invalid && formGroup.controls['name'].hasError('maxlength')
        ) {
          <small class="text-red-600 text-xs ml-2">
            25 caractères maximum
          </small>
        }
      </div>
      <div class="mt-2">
        <textarea
          id="category-desc"
          rows="5"
          cols="36"
          formControlName="description"
          placeholder="Description..."
          [ngClass]="{
            'ng-invalid ng-dirty':
              formGroup.invalid && formGroup.controls['description'].errors
          }"
          pInputTextarea
        >
        </textarea>
        @if (formGroup.invalid && formGroup.controls['description'].errors) {
          <small class="text-red-600 text-xs ml-2">
            100 caractères maximum.
          </small>
        }
      </div>
    </form>
  `,
  styles: ``,
})
export class UpdateCategoryFormComponent {
  @Input() formGroup!: FormGroup;
}
