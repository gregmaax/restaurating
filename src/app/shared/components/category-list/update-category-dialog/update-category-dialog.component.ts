import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RestaurantNameRatingFormComponent } from '../../restaurant-list/update-restaurant-dialog/restaurant-name-rating-form/restaurant-name-rating-form.component';
import { Restaurant } from '../../../interfaces/restaurant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../../data-access/restaurant.service';
import { CategoryService } from '../../../data-access/category.service';
import { UpdateCategoryFormComponent } from './update-category-form/update-category-form.component';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-update-category-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    RestaurantNameRatingFormComponent,
    UpdateCategoryFormComponent,
  ],
  template: `
    <p-button
      (click)="showDialog()"
      size="small"
      icon="pi pi-pencil"
      [rounded]="true"
      [text]="true"
    />
    <p-dialog
      header="Modifier ce restaurant"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '25rem' }"
    >
      <app-update-category-form [formGroup]="updateCategoryForm" />
      <div class="flex justify-content-end gap-2 py-3">
        <p-button
          label="Annuler"
          severity="contrast"
          (click)="onCancel()"
          size="small"
          [raised]="true"
        />
        <p-button
          label="Modifier"
          severity="secondary"
          (click)="onSave()"
          size="small"
          [disabled]="updateCategoryForm.invalid"
          [raised]="true"
        />
      </div>
    </p-dialog>
  `,
  styles: ``,
})
export class UpdateCategoryDialogComponent implements OnInit {
  visible = signal(false);
  categoryToUpdate = input<Category>();
  categoryService = inject(CategoryService);
  formBuilder = inject(FormBuilder);
  updateCategoryForm!: FormGroup;

  ngOnInit(): void {
    this.updateCategoryForm = this.formBuilder.nonNullable.group({
      name: [
        this.categoryToUpdate()?.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      description: [
        this.categoryToUpdate()?.description,
        Validators.maxLength(100),
      ],
    });
  }

  showDialog() {
    this.visible.set(true);
  }

  onCancel() {
    this.visible.set(false);
  }

  onSave() {
    this.visible.set(false);
    //next of the update$
    this.categoryService.update$.next({
      id: this.categoryToUpdate()?.id,
      name: this.updateCategoryForm.value.name as string,
      description: this.updateCategoryForm.value.description as string,
    });
    //this.updateRestaurantForm.reset();
  }
}
