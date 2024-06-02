export interface Restaurant {
  id?: string;
  name: string;
  comment?: string;
  address?: string;
  city: string;
  createdAt: number;
  updatedAt: number;
  rating?: number;
  userId: string;
  categoryId: string | null;
}

export type AddRestaurant = Pick<
  Restaurant,
  'name' | 'address' | 'comment' | 'city' | 'categoryId'
>;

export type DeleteRestaurant = Restaurant['id'];
