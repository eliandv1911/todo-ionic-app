import { Injectable } from '@angular/core';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryLocalDataSource } from '../datasources/category-local.datasource';
import { CategoryEntity } from '../../domain/entities/category.entity';

@Injectable({ providedIn: 'root' })
export class CategoryRepositoryImpl extends CategoryRepository {
  constructor(private ds: CategoryLocalDataSource) {
    super();
  }

  getAll(): Promise<CategoryEntity[]> {
    return this.ds.getAll();
  }

  add(name: string): Promise<CategoryEntity> {
    return this.ds.add(name);
  }

  update(id: string, name: string): Promise<void> {
    return this.ds.update(id, name);
  }

  delete(id: string): Promise<void> {
    return this.ds.delete(id);
  }
}
