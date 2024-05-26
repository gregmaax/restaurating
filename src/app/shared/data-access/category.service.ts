import { computed, inject, Injectable, signal } from '@angular/core';
import { Category } from '../interfaces/category';
import { FIRESTORE } from '../../app.config';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { map, merge, Observable } from 'rxjs';
import { connect } from 'ngxtension/connect';

interface CategoryState {
  categories: Category[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private firestore = inject(FIRESTORE);

  //sources
  categories$ = this.getCategories();

  //state
  private state = signal<CategoryState>({
    categories: [],
    error: null,
  });

  //selectors
  categories = computed(() => this.state().categories);
  error = computed(() => this.state().error);

  constructor() {
    //reducers
    const nextState$ = merge(
      this.categories$.pipe(map((categories) => ({ categories }))),
    );

    connect(this.state).with(nextState$);
  }

  private getCategories() {
    const categoriesCollection = query(
      collection(this.firestore, 'categories'),
      orderBy('createdAt', 'desc'),
      //limit(50)
    );

    return collectionData(categoriesCollection, { idField: 'id' }).pipe(
      map((categories) => [...categories]),
    ) as Observable<Category[]>;
  }
}
