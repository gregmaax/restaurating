import { computed, inject, Injectable, signal } from '@angular/core';
import { AddRestaurant, Restaurant } from '../interfaces/restaurant';
import { FIRESTORE } from '../../app.config';
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  where,
} from 'firebase/firestore';
import {
  catchError,
  defer,
  exhaustMap,
  ignoreElements,
  map,
  merge,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { connect } from 'ngxtension/connect';
import { collectionData } from 'rxfire/firestore';

interface RestaurantState {
  restaurants: Restaurant[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private firestore = inject(FIRESTORE);

  //sources
  restaurants$ = this.getRestaurants();
  add$ = new Subject<AddRestaurant>();

  //state
  private state = signal<RestaurantState>({
    restaurants: [],
    error: null,
  });

  //selectors
  restaurants = computed(() => this.state().restaurants);
  error = computed(() => this.state().error);

  constructor() {
    //reducers
    const nextState$ = merge(
      this.restaurants$.pipe(map((restaurants) => ({ restaurants }))),
      this.add$.pipe(
        exhaustMap((restaurant) => this.addRestaurant(restaurant)),
        ignoreElements(),
        catchError((error) => of({ error })),
      ),
    );
    connect(this.state).with(nextState$);
  }

  //
  countRestaurantsInCategory(categoryId?: string) {
    let count = 0;
    if (categoryId) {
      for (let restaurant of this.restaurants()) {
        if (restaurant.categoryId === categoryId) {
          count++;
        }
      }
    }
    return count;
  }

  //get restaurants by categoryId
  getRestaurantsByCategory(categoryId?: string) {
    const restaurantByCatId = signal<Restaurant[]>([]);
    for (let restaurant of this.restaurants()) {
      if (restaurant.categoryId === categoryId) {
        restaurantByCatId().push(restaurant);
      }
    }
    return restaurantByCatId();
  }

  //get all restaurants from db
  private getRestaurants() {
    const restaurantsCollection = query(
      collection(this.firestore, 'restaurants'),
      orderBy('createdAt', 'desc'),
      //limit(50)
    );

    return collectionData(restaurantsCollection, { idField: 'id' }).pipe(
      map((categories) => [...categories]),
    ) as Observable<Restaurant[]>;
  }

  //add a restaurant
  private addRestaurant(restaurant: AddRestaurant) {
    const newRestaurant: Restaurant = {
      name: restaurant.name,
      comment: restaurant.comment,
      address: restaurant.address,
      city: restaurant.city,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      rating: null,
      userId: 'user1',
      categoryId: 'lReZtwEMESpGz33tunXL',
    };

    console.log(newRestaurant);

    const restaurantsCollection = collection(this.firestore, 'restaurants');
    return defer(() => addDoc(restaurantsCollection, newRestaurant));
  }
}
