import {
  ChangeDetectorRef,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RestaurantNameRatingFormComponent } from '../update-restaurant-dialog/restaurant-name-rating-form/restaurant-name-rating-form.component';
import { Restaurant } from '../../../interfaces/restaurant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../../data-access/restaurant.service';
import { RestaurantCommentFormComponent } from './restaurant-comment-form/restaurant-comment-form.component';

@Component({
  selector: 'app-update-restaurant-comment-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    RestaurantNameRatingFormComponent,
    RestaurantCommentFormComponent,
  ],
  template: `
    <p-button
      (click)="showDialog()"
      size="small"
      icon="pi pi-comment"
      [rounded]="true"
      [text]="true"
    />
    <p-dialog
      header="Modifier ce restaurant"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '25rem' }"
    >
      <app-restaurant-comment-form [formGroup]="updateCommentForm" />
      <div class="flex justify-content-end gap-2 py-3">
        <p-button
          label="Annuler"
          severity="danger"
          (click)="onCancel()"
          size="small"
        />
        <p-button label="Ajouter" (click)="onSave()" size="small" />
      </div>
    </p-dialog>
  `,
  styles: ``,
})
export class UpdateRestaurantCommentDialogComponent {
  visible = signal(false);
  restaurantToUpdate = input<Restaurant>();
  formBuilder = inject(FormBuilder);
  restaurantService = inject(RestaurantService);
  updateCommentForm!: FormGroup;
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.updateCommentForm = this.formBuilder.nonNullable.group({
      comment: [
        this.restaurantToUpdate()?.comment,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  showDialog() {
    this.visible.set(true);
    this.cdr.detectChanges();
  }

  onCancel() {
    this.visible.set(false);
  }

  onSave() {
    this.visible.set(false);
    //next of the update$
    this.restaurantService.updateComment$.next({
      id: this.restaurantToUpdate()?.id,
      comment: this.updateCommentForm.value.comment as string,
    });
    //this.updateRestaurantForm.reset();
  }
}
