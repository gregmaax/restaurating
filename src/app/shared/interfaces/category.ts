export interface Category {
  id?: string;
  name: string;
  description?: string;
  createdAt: number;
  userId: string;
}

export type AddCategory = Omit<Category, 'id' | 'createdAt' | 'userId'>;
