import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CategoryEntity } from '../../../../domain/entities/category.entity';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
})
export class TaskFilterComponent {
  @Input() categories: CategoryEntity[] = [];
  @Input() currentValue = '__ALL__';

  @Output() change = new EventEmitter<string>();

  onChange(event: any) {
    this.change.emit(event.detail.value);
  }
}
