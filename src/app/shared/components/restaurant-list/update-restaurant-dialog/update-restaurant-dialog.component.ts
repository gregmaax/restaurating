import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RestaurantFormComponent } from '../../restaurant-form/restaurant-form.component';
import { RestaurantNameRatingFormComponent } from './restaurant-name-rating-form/restaurant-name-rating-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../../../interfaces/restaurant';
import { RestaurantService } from '../../../data-access/restaurant.service';
import { CategoryService } from '../../../data-access/category.service';

@Component({
  selector: 'app-update-restaurant-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    RestaurantFormComponent,
    RestaurantNameRatingFormComponent,
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
      <app-restaurant-name-rating-form
        [selectCategories]="categoriesToSelectList()"
        [formGroup]="updateRestaurantForm"
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
          label="Modifier"
          severity="secondary"
          (click)="onSave()"
          size="small"
          [disabled]="updateRestaurantForm.invalid"
          [raised]="true"
        />
      </div>
    </p-dialog>
  `,
  styles: ``,
})
export class UpdateRestaurantDialogComponent implements OnInit {
  visible = signal(false);
  restaurantToUpdate = input<Restaurant>();
  formBuilder = inject(FormBuilder);
  categoryService = inject(CategoryService);
  restaurantService = inject(RestaurantService);
  updateRestaurantForm!: FormGroup;

  categoriesToSelectList = computed(() =>
    this.categoryService
      .categories()
      .map((category) => ({
        id: category.id,
        name: category.name.toUpperCase(),
      })),
  );

  ngOnInit(): void {
    this.updateRestaurantForm = this.formBuilder.nonNullable.group({
      name: [
        this.restaurantToUpdate()?.name,
        [Validators.required, Validators.maxLength(25)],
      ],
      rating: [
        this.restaurantToUpdate()?.rating,
        [Validators.min(0), Validators.max(5)],
      ],
      categoryId: [this.restaurantToUpdate()?.categoryId],
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
    this.restaurantService.updateNameAndRating$.next({
      id: this.restaurantToUpdate()?.id,
      rating: this.updateRestaurantForm.value.rating as unknown as number,
      name: this.updateRestaurantForm.value.name as string,
      categoryId: this.updateRestaurantForm.value.categoryId as string,
    });
    //this.updateRestaurantForm.reset();
  }
}
