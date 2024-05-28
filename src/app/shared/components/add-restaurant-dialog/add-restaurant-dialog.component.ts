import { Component, computed, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { RestaurantService } from '../../data-access/restaurant.service';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../data-access/category.service';

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
  categoryService = inject(CategoryService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  params = toSignal(this.route.paramMap);

  category = computed(() =>
    this.categoryService
      .categories()
      .find((category) => category.id === this.params()?.get('id')),
  );

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
    this.restaurantService.add$.next({
      address: this.restaurantForm.value.address as string,
      categoryId: this.category()?.id as string,
      city: this.restaurantForm.value.city as string,
      comment: this.restaurantForm.value.comment as string,
      name: this.restaurantForm.value.name as string,
    });
    this.restaurantForm.reset();
  }

  onCancel() {
    this.visible.set(false);
    this.restaurantForm.reset();
  }
}
