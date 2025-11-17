import { CategoryEntity } from '../entities/category.entity';

export abstract class CategoryRepository {
  abstract getAll(): Promise<CategoryEntity[]>;
  abstract add(name: string): Promise<CategoryEntity>;
  abstract update(id: string, name: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
