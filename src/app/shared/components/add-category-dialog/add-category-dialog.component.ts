import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategoryService } from '../../data-access/category.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, CategoryFormComponent],
  template: `
    <p-button
      (click)="showDialog()"
      label="Ajouter une catégorie"
      size="small"
      class="p-3"
    />
    <p-dialog
      header="Nouvelle catégorie"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '25rem' }"
    >
      <app-category-form [formGroup]="categoryForm" />
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
export class AddCategoryDialogComponent {
  visible = signal(false);
  categoryService = inject(CategoryService);
  formBuilder = inject(FormBuilder);

  categoryForm = this.formBuilder.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    ],
    description: [''],
  });

  showDialog() {
    this.visible.set(true);
  }

  onSave() {
    this.visible.set(false);
    this.categoryService.add$.next(this.categoryForm.getRawValue());
    this.categoryForm.reset();
  }

  onCancel() {
    this.visible.set(false);
    this.categoryForm.reset();
  }
}
