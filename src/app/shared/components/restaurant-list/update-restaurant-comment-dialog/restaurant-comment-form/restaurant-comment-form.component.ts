import { Component, Input } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-restaurant-comment-form',
  standalone: true,
  imports: [InputTextareaModule, ReactiveFormsModule, NgClass],
  template: `
    <form [formGroup]="formGroup">
      <div class="flex flex-col items-start mt-2 gap-2">
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
          placeholder="Comment..."
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
    </form>
  `,
  styles: ``,
})
export class RestaurantCommentFormComponent {
  @Input() formGroup!: FormGroup;
}
