import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  template: `
    <div
      class="overflow-hidden shadow-md w-[250px] h-[280px] mx-auto sm:px-6 lg:px-8 border-[1px] border-blue-600 rounded"
    >
      <!-- card header -->
      <div
        class="px-6 py-4 bg-white border-b border-gray-200 font-bold uppercase text-center"
      >
        {{ categoryName() }}
      </div>

      <!-- card body -->
      <div class="bg-white border-b border-gray-200 h-32 p-2 text-center">
        <!-- content goes here -->
        @if (categoryDesc()) {
          <small>{{ categoryDesc() }}</small>
        } @else {
          <small>Aucune description</small>
        }
      </div>

      <!-- card footer -->
      <div
        class="bg-white border-gray-200 h-[35px] text-right bottom-0 flex justify-center items-center w-full"
      >
        <div class="text-center">
          <small>{{ restaurantCount() }} restaurants ajoutés.</small>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CategoryCardComponent {
  categoryName = input.required<string>();
  categoryDesc = input<string>();
  restaurantCount = input.required<number>();

  constructor() {}
}
