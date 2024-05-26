import { Component, inject } from '@angular/core';
import { CategoryListComponent } from './ui/category-list/category-list.component';
import { CategoryService } from '../shared/data-access/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoryListComponent],
  template: `
    <div class="m-12">
      <app-category-list [categories]="categoryService.categories()" />
    </div>
  `,
  styles: ``,
})
export default class HomeComponent {
  categoryService = inject(CategoryService);
}
