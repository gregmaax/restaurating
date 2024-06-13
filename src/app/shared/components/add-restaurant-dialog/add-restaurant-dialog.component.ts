import { Component, computed, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { RestaurantService } from '../../data-access/restaurant.service';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../data-access/category.service';
import { SelectCategory } from '../../interfaces/category';

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
      [raised]="true"
    />
    <p-dialog
      header="Nouveau restaurant"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '25rem' }"
    >
      <app-restaurant-form
        [isOnRestaurantPage]="isOnRestaurantPage()"
        [selectCategories]="categoriesToSelectList()"
        [formGroup]="restaurantForm"
      />
      <div class="flex justify-content-end gap-2 py-3">
        <p-button
          label="Annuler"
          severity="contrast"
          (click)="onCancel()"
          size="small"
          [raised]="true"
        />
        <p-button
          label="Ajouter"
          (click)="onSave()"
          size="small"
          severity="secondary"
          [disabled]="restaurantForm.invalid"
          [raised]="true"
        />
      </div>
    </p-dialog>
  `,
  styles: ``,
})
export class AddRestaurantDialogComponent {
  isOnRestaurantPage = input.required<boolean>();
  visible = signal(false);
  restaurantService = inject(RestaurantService);
  categoryService = inject(CategoryService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  params = toSignal(this.route.paramMap);

  categoriesToSelectList = computed(() =>
    this.categoryService
      .categories()
      .map((category) => ({ id: category.id, name: category.name })),
  );

  category = computed(() =>
    this.categoryService
      .categories()
      .find((category) => category.id === this.params()?.get('id')),
  );

  restaurantForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(25)]],
    comment: ['', Validators.maxLength(35)],
    rating: ['', [Validators.min(0), Validators.max(5)]],
    city: ['', Validators.required],
    categoryId: [''],
  });

  showDialog() {
    this.visible.set(true);
  }

  onSave() {
    this.visible.set(false);
    this.restaurantService.add$.next({
      rating: this.restaurantForm.value.rating as unknown as number,
      categoryId:
        this.restaurantForm.value.categoryId == null ||
        this.restaurantForm.value.categoryId == ''
          ? (this.category()?.id as string)
          : (this.restaurantForm.value.categoryId as string),
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
