import { Injectable } from '@angular/core';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryEntity } from '../entities/category.entity';

@Injectable({ providedIn: 'root' })
export class GetCategoriesUseCase {
  constructor(private repo: CategoryRepository) {}
  execute(): Promise<CategoryEntity[]> {
    return this.repo.getAll();
  }
}

@Injectable({ providedIn: 'root' })
export class AddCategoryUseCase {
  constructor(private repo: CategoryRepository) {}
  execute(name: string): Promise<CategoryEntity> {
    return this.repo.add(name);
  }
}

@Injectable({ providedIn: 'root' })
export class UpdateCategoryUseCase {
  constructor(private repo: CategoryRepository) {}
  execute(id: string, name: string): Promise<void> {
    return this.repo.update(id, name);
  }
}

@Injectable({ providedIn: 'root' })
export class DeleteCategoryUseCase {
  constructor(private repo: CategoryRepository) {}
  execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
