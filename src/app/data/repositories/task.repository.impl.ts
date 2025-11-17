import { Injectable } from '@angular/core';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { TaskLocalDataSource } from '../datasources/task-local.datasource';
import { TaskEntity } from '../../domain/entities/task.entity';

@Injectable({ providedIn: 'root' })
export class TaskRepositoryImpl extends TaskRepository {
  constructor(private ds: TaskLocalDataSource) {
    super();
  }

  getAll(): Promise<TaskEntity[]> {
    return this.ds.getAll();
  }

  add(title: string, categoryId?: string): Promise<TaskEntity> {
    return this.ds.add(title, categoryId);
  }

  toggleCompleted(id: string): Promise<void> {
    return this.ds.toggleCompleted(id);
  }

  update(task: TaskEntity): Promise<void> {
    return this.ds.update(task);
  }

  delete(id: string): Promise<void> {
    return this.ds.delete(id);
  }

  clearAll(): Promise<void> {
    return this.ds.clearAll();
  }
}
