import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    InputTextareaModule,
    ButtonModule,
    ReactiveFormsModule,
    NgClass,
  ],
  template: `
    <form [formGroup]="formGroup">
      <div class="flex flex-col gap-2">
        <label
          [ngClass]="{
            'text-red-600':
              formGroup.invalid && formGroup.controls['name'].errors
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
export class CategoryFormComponent {
  @Input() formGroup!: FormGroup;
}
