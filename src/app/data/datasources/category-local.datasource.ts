import { Injectable } from '@angular/core';
import { CategoryEntity } from '../../domain/entities/category.entity';

const CATEGORIES_KEY = 'categories_v1';

@Injectable({ providedIn: 'root' })
export class CategoryLocalDataSource {
  private categories: CategoryEntity[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const json = localStorage.getItem(CATEGORIES_KEY);
    if (json) this.categories = JSON.parse(json);
  }

  private save() {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(this.categories));
  }

  private generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async getAll(): Promise<CategoryEntity[]> {
    this.load();
    return [...this.categories];
  }

  async add(name: string): Promise<CategoryEntity> {
    const cat: CategoryEntity = { id: this.generateId(), name: name.trim() };
    this.categories.push(cat);
    this.save();
    return cat;
  }

  async update(id: string, name: string): Promise<void> {
    const c = this.categories.find((x) => x.id === id);
    if (c) {
      c.name = name.trim();
      this.save();
    }
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter((x) => x.id !== id);
    this.save();
  }
}
