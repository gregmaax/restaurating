import { Component, inject } from '@angular/core';
import { CategoryListComponent } from './ui/category-list/category-list.component';
import { CategoryService } from '../shared/data-access/category.service';
import { AddCategoryDialogComponent } from './ui/add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoryListComponent, AddCategoryDialogComponent],
  template: `
    <div class="m-12 flex flex-col gap-6">
      <app-add-category-dialog />
      <app-category-list [categories]="categoryService.categories()" />
    </div>
  `,
  styles: ``,
})
export default class HomeComponent {
  categoryService = inject(CategoryService);
}
