import { Component, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-create-form',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './category-create-form.component.html',
  styleUrls: ['./category-create-form.component.scss'],
})
export class CategoryCreateFormComponent {

  name = '';

  @Output() create = new EventEmitter<string>();

  submit() {
    const value = this.name.trim();
    if (!value) return;

    this.create.emit(value);
    this.name = '';
  }
}
