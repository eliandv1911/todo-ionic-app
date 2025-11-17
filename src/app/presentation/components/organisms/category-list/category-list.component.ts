import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CategoryEntity } from '../../../../domain/entities/category.entity';
import { CategoryItemComponent } from '../../molecules/category-item/category-item.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [IonicModule, CategoryItemComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  @Input() categories: CategoryEntity[] = [];
  @Output() update = new EventEmitter<CategoryEntity>();
  @Output() remove = new EventEmitter<CategoryEntity>();
}
