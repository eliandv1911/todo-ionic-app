import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TaskEntity } from '../../../../domain/entities/task.entity';
import { CategoryEntity } from '../../../../domain/entities/category.entity';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: TaskEntity;
  @Input() categoryName = '';
  @Input() categories: CategoryEntity[] = [];

  @Output() toggle = new EventEmitter<TaskEntity>();
  @Output() remove = new EventEmitter<TaskEntity>();
  @Output() update = new EventEmitter<TaskEntity>();

  editing = false;

  editTitle = '';
  editCategoryId?: string;

  isEditing() {
    return this.editing;
  }

  startEdit() {
    this.editing = true;
    this.editTitle = this.task.title;
    this.editCategoryId = this.task.categoryId;
  }

  cancelEdit() {
    this.editing = false;
  }

  saveEdit() {
    if (!this.editTitle.trim()) return;

    const updated: TaskEntity = {
      ...this.task,
      title: this.editTitle.trim(),
      categoryId: this.editCategoryId ?? undefined,
    };

    this.update.emit(updated);
    this.editing = false;
  }
}
