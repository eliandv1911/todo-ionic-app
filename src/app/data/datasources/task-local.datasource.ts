import { Injectable } from '@angular/core';
import { TaskEntity } from '../../domain/entities/task.entity';

const TASKS_KEY = 'tasks_v1';

@Injectable({ providedIn: 'root' })
export class TaskLocalDataSource {
  private tasks: TaskEntity[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const json = localStorage.getItem(TASKS_KEY);
    if (json) this.tasks = JSON.parse(json);
  }

  private save() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks));
  }

  private generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async getAll(): Promise<TaskEntity[]> {
    this.load();
    return [...this.tasks];
  }

  async add(title: string, categoryId?: string): Promise<TaskEntity> {
    const entity: TaskEntity = {
      id: this.generateId(),
      title: title.trim(),
      completed: false,
      categoryId,
    };
    this.tasks.unshift(entity);
    this.save();
    return entity;
  }

  async toggleCompleted(id: string): Promise<void> {
    const t = this.tasks.find((x) => x.id === id);
    if (t) {
      t.completed = !t.completed;
      this.save();
    }
  }

  async update(task: TaskEntity): Promise<void> {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = { ...task };
      this.save();
    }
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((x) => x.id !== id);
    this.save();
  }

  async clearAll(): Promise<void> {
    this.tasks = [];
    this.save();
  }
}
