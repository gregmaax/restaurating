import { Component, Input } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant-comment-form',
  standalone: true,
  imports: [InputTextareaModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="formGroup">
      <div class="flex flex-col items-start mt-2 gap-2">
        <small>Qu'avez-vous pensé de ce restaurant ?</small>
        <textarea
          id="restaurant-comment"
          rows="2"
          cols="36"
          formControlName="comment"
          placeholder="Comment..."
          pInputTextarea
        >
        </textarea>
      </div>
    </form>
  `,
  styles: ``,
})
export class RestaurantCommentFormComponent {
  @Input() formGroup!: FormGroup;
}
