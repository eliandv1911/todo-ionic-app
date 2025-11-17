import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CategoryEntity } from '../../../../domain/entities/category.entity';

@Component({
  selector: 'app-task-create-form',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './task-create-form.component.html',
  styleUrls: ['./task-create-form.component.scss'],
})
export class TaskCreateFormComponent {
  @Input() categories: CategoryEntity[] = [];
  @Input() showCategories = false;

  @Output() create = new EventEmitter<{ title: string; categoryId?: string }>();

  title = '';
  catId: string | null = null;

  submit() {
    if (!this.title.trim()) return;

    this.create.emit({
      title: this.title.trim(),
      categoryId: this.catId ?? undefined,
    });

    this.title = '';
    this.catId = null;
  }
}
