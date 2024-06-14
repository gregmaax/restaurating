import { Component, inject } from '@angular/core';
import { AddCategoryDialogComponent } from '../shared/components/add-category-dialog/add-category-dialog.component';
import { CategoryListComponent } from '../shared/components/category-list/category-list.component';
import { CategoryService } from '../shared/data-access/category.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [AddCategoryDialogComponent, CategoryListComponent],
  template: `
    <div class="container w-full mx-auto my-12 flex flex-col gap-6">
      <app-add-category-dialog />
      @if (categoryService.categories().length > 0) {
        <app-category-list [categories]="categoryService.categories()" />
      } @else {
        <span>Aucune catégorie ajoutée.</span>
      }
    </div>
  `,
  styles: ``,
})
export default class CategoriesComponent {
  categoryService = inject(CategoryService);

  constructor(private titleService: Title) {
    this.titleService.setTitle('Restaurating - Catégories');
  }
}
