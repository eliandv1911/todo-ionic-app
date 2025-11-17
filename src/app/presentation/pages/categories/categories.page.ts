import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

import { CategoryEntity } from '../../../domain/entities/category.entity';
import {
  GetCategoriesUseCase,
  AddCategoryUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
} from '../../../domain/usecases/category.usecases';

import { RemoteConfigService } from '../../../core/services/remote-config.service';

import { CategoryCreateFormComponent } from '../../components/molecules/category-create-form/category-create-form.component';
import { CategoryListComponent } from '../../components/organisms/category-list/category-list.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [IonicModule, RouterLink, CategoryCreateFormComponent, CategoryListComponent],
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  private getCategoriesUC = inject(GetCategoriesUseCase);
  private addCategoryUC = inject(AddCategoryUseCase);
  private updateCategoryUC = inject(UpdateCategoryUseCase);
  private deleteCategoryUC = inject(DeleteCategoryUseCase);

  private remoteConfig = inject(RemoteConfigService);

  categories = signal<CategoryEntity[]>([]);

  showCategoriesFeature = computed(() => this.remoteConfig.categoriesEnabled());

  async ngOnInit() {
    await this.load();
  }

  private async load() {
    const list = await this.getCategoriesUC.execute();
    this.categories.set(list);
  }

  async add(name: string) {
    await this.addCategoryUC.execute(name);
    await this.load();
  }

  async update(category: CategoryEntity) {
    await this.updateCategoryUC.execute(category.id, category.name);
    await this.load();
  }

  async delete(category: CategoryEntity) {
    await this.deleteCategoryUC.execute(category.id);
    await this.load();
  }
}
