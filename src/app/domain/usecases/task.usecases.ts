import { Injectable } from '@angular/core';
import { TaskRepository } from '../repositories/task.repository';
import { TaskEntity } from '../entities/task.entity';

@Injectable({ providedIn: 'root' })
export class GetTasksUseCase {
  constructor(private repo: TaskRepository) {}
  execute(): Promise<TaskEntity[]> {
    return this.repo.getAll();
  }
}

@Injectable({ providedIn: 'root' })
export class AddTaskUseCase {
  constructor(private repo: TaskRepository) {}
  execute(title: string, categoryId?: string): Promise<TaskEntity> {
    return this.repo.add(title, categoryId);
  }
}

@Injectable({ providedIn: 'root' })
export class ToggleTaskUseCase {
  constructor(private repo: TaskRepository) {}
  execute(id: string): Promise<void> {
    return this.repo.toggleCompleted(id);
  }
}

@Injectable({ providedIn: 'root' })
export class UpdateTaskUseCase {
  constructor(private repo: TaskRepository) {}
  execute(task: TaskEntity): Promise<void> {
    return this.repo.update(task);
  }
}

@Injectable({ providedIn: 'root' })
export class DeleteTaskUseCase {
  constructor(private repo: TaskRepository) {}
  execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}

@Injectable({ providedIn: 'root' })
export class ClearTasksUseCase {
  constructor(private repo: TaskRepository) {}
  execute(): Promise<void> {
    return this.repo.clearAll();
  }
}
