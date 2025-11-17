import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TaskEntity } from '../../../../domain/entities/task.entity';
import { CategoryEntity } from '../../../../domain/entities/category.entity';
import { TaskItemComponent } from '../../molecules/task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [IonicModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: TaskEntity[] = [];
  @Input() categories: CategoryEntity[] = [];

  @Output() toggle = new EventEmitter<TaskEntity>();
  @Output() remove = new EventEmitter<TaskEntity>();
  @Output() update = new EventEmitter<TaskEntity>();

  getCategoryName(id?: string): string {
    if (!id) return '';
    const found = this.categories.find((c) => c.id === id);
    return found ? found.name : '';
  }
}
