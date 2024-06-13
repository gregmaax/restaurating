export interface Category {
  id?: string;
  name: string;
  description?: string;
  createdAt: number;
  updatedAt?: number;
  userId: string;
}

export type AddCategory = Omit<Category, 'id' | 'createdAt' | 'userId'>;

export type DeleteCategory = Category['id'];

export type UpdateCategory = Pick<
  Category,
  'id' | 'name' | 'description' | 'updatedAt'
>;

export type SelectCategory = Pick<Category, 'id' | 'name'>;
