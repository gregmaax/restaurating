import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { RestaurantService } from '../../data-access/restaurant.service';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';

@Component({
  selector: 'app-add-restaurant-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    CategoryFormComponent,
    DialogModule,
    RestaurantFormComponent,
  ],
  template: `
    <p-button
      (click)="showDialog()"
      label="Ajouter un restaurant"
      size="small"
      severity="secondary"
    />
    <p-dialog
      header="Nouveau restaurant"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '25rem' }"
    >
      <app-restaurant-form [formGroup]="restaurantForm" />
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
export class AddRestaurantDialogComponent {
  visible = signal(false);
  restaurantService = inject(RestaurantService);
  formBuilder = inject(FormBuilder);

  restaurantForm = this.formBuilder.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    ],
    comment: [''],
    address: [''],
    city: [''],
  });

  showDialog() {
    this.visible.set(true);
  }

  onSave() {
    this.visible.set(false);
    this.restaurantService.add$.next(this.restaurantForm.getRawValue());
    this.restaurantForm.reset();
  }

  onCancel() {
    this.visible.set(false);
    this.restaurantForm.reset();
  }
}
