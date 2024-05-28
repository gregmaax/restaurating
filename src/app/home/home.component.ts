import { Component } from '@angular/core';
import { CategoryListComponent } from '../shared/components/category-list/category-list.component';
import { AddCategoryDialogComponent } from '../shared/components/add-category-dialog/add-category-dialog.component';
import { RestaurantListComponent } from '../shared/components/restaurant-list/restaurant-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategoryListComponent,
    AddCategoryDialogComponent,
    RestaurantListComponent,
  ],
  template: `<div class="m-12 flex flex-col gap-6">Page d'accueil</div>`,
  styles: ``,
})
export default class HomeComponent {}
