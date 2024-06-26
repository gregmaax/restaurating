import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer
      class="flex items-center justify-center w-full fixed bottom-0 py-4 border-t-[1px] bg-neutral-200 shadow"
    >
      <span class="pi pi-twitter"></span>
    </footer>
  `,
  styles: ``,
})
export class FooterComponent {}
