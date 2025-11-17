import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CategoryEntity } from '../../../../domain/entities/category.entity';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() category!: CategoryEntity;

  @Output() update = new EventEmitter<CategoryEntity>();
  @Output() remove = new EventEmitter<CategoryEntity>();

  editing = signal(false);
  editName = signal('');

  startEdit() {
    this.editing.set(true);
    this.editName.set(this.category.name);
  }

  cancel() {
    this.editing.set(false);
  }

  save() {
    const name = this.editName().trim();
    if (!name) return;

    this.update.emit({
      ...this.category,
      name,
    });

    this.editing.set(false);
  }
}
