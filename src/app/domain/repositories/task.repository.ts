import { TaskEntity } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract getAll(): Promise<TaskEntity[]>;
  abstract add(title: string, categoryId?: string): Promise<TaskEntity>;
  abstract toggleCompleted(id: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract clearAll(): Promise<void>;
  abstract update(task: TaskEntity): Promise<void>; // NEW
}
