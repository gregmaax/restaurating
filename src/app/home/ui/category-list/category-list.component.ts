import { Component, input } from '@angular/core';
import { Category } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  template: `
    <ul>
      @for (category of categories(); track category.id) {
        <li>
          <span class="text-red-700">{{ category.id }}</span> -
          <span class="text-blue-700">{{ category.name }}</span>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class CategoryListComponent {
  categories = input.required<Category[]>();
}
