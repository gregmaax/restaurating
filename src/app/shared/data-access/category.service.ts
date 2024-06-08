import { computed, inject, Injectable, signal } from '@angular/core';
import { AddCategory, Category, UpdateCategory } from '../interfaces/category';
import { FIRESTORE } from '../../app.config';
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import {
  map,
  merge,
  Observable,
  defer,
  Subject,
  exhaustMap,
  ignoreElements,
  catchError,
  of,
} from 'rxjs';
import { connect } from 'ngxtension/connect';
import { RestaurantService } from './restaurant.service';

interface CategoryState {
  categories: Category[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private firestore = inject(FIRESTORE);
  restaurantService = inject(RestaurantService);

  //sources
  categories$ = this.getCategories();
  add$ = new Subject<AddCategory>();
  delete$ = this.restaurantService.deleteCategory$;
  update$ = new Subject<UpdateCategory>();

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
      this.add$.pipe(
        exhaustMap((category) => this.addCategory(category)),
        ignoreElements(),
        catchError((error) => of({ error })),
      ),
      this.delete$.pipe(
        exhaustMap((id) => this.deleteCategory(id)),
        ignoreElements(),
        catchError((error) => of({ error })),
      ),
      this.update$.pipe(
        exhaustMap((updateCategory) => this.updateCategory(updateCategory)),
        ignoreElements(),
        catchError((error) => of({ error })),
      ),
    );

    connect(this.state).with(nextState$);
  }

  //update a category
  private updateCategory(category: UpdateCategory) {
    const categoryToUpdate = doc(this.firestore, `categories/${category.id}`);
    return updateDoc(categoryToUpdate, {
      name: category.name,
      description: category.description,
      updatedAt: Date.now(),
    });
  }

  //delete a category
  private deleteCategory(categoryId?: string) {
    const categoryDocRef = doc(this.firestore, `categories/${categoryId}`);
    return deleteDoc(categoryDocRef);
  }

  //get all categories from db
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

  //add a category
  private addCategory(category: AddCategory) {
    const newCategory: Category = {
      name: category.name,
      description: category.description,
      userId: 'user1',
      createdAt: Date.now(),
    };

    console.log(newCategory);

    const categoriesCollection = collection(this.firestore, 'categories');
    return defer(() => addDoc(categoriesCollection, newCategory));
  }
}
