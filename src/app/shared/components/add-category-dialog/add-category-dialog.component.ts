import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategoryService } from '../../data-access/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    CategoryFormComponent,
    ToastModule,
    RippleModule,
  ],
  providers: [MessageService],
  template: `
    <p-button
      (click)="showDialog()"
      label="Ajouter une catégorie"
      size="small"
      severity="secondary"
      [raised]="true"
    />
    <p-toast position="bottom-center" key="bc" />
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
          [disabled]="categoryForm.invalid"
          [raised]="true"
        />
      </div>
    </p-dialog>
  `,
  styles: ``,
})
export class AddCategoryDialogComponent {
  visible = signal(false);
  categoryService = inject(CategoryService);
  formBuilder = inject(FormBuilder);
  messageService = inject(MessageService);

  categoryForm = this.formBuilder.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    ],
    description: ['', Validators.maxLength(100)],
  });

  showDialog() {
    this.visible.set(true);
  }

  onSave() {
    this.visible.set(false);
    this.categoryService.add$.next(this.categoryForm.getRawValue());
    this.categoryForm.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'Catégorie ajoutée',
      key: 'bc',
    });
  }

  onCancel() {
    this.visible.set(false);
    this.categoryForm.reset();
  }
}
