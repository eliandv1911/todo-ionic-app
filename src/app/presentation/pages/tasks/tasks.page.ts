import { Component, OnInit, computed, signal, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

import { TaskEntity } from '../../../domain/entities/task.entity';
import { CategoryEntity } from '../../../domain/entities/category.entity';

import {
  GetTasksUseCase,
  AddTaskUseCase,
  ToggleTaskUseCase,
  DeleteTaskUseCase,
  ClearTasksUseCase,
  UpdateTaskUseCase,
} from '../../../domain/usecases/task.usecases';

import { GetCategoriesUseCase } from '../../../domain/usecases/category.usecases';
import { RemoteConfigService } from '../../../core/services/remote-config.service';

import { TaskFilterComponent } from '../../components/molecules/task-filter/task-filter.component';
import { TaskCreateFormComponent } from '../../components/molecules/task-create-form/task-create-form.component';
import { TaskListComponent } from '../../components/organisms/task-list/task-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    IonicModule,
    RouterLink,
    TaskFilterComponent,
    TaskCreateFormComponent,
    TaskListComponent,
  ],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  private getTasksUC = inject(GetTasksUseCase);
  private addTaskUC = inject(AddTaskUseCase);
  private toggleTaskUC = inject(ToggleTaskUseCase);
  private deleteTaskUC = inject(DeleteTaskUseCase);
  private clearTasksUC = inject(ClearTasksUseCase);
  private updateTaskUC = inject(UpdateTaskUseCase);

  private getCategoriesUC = inject(GetCategoriesUseCase);
  private remoteConfig = inject(RemoteConfigService);

  tasks = signal<TaskEntity[]>([]);
  categories = signal<CategoryEntity[]>([]);

  private filterCategoryId = signal<string | null>(null);

  showCategoriesFeature = computed(() => this.remoteConfig.categoriesEnabled());

  get currentFilterValue(): string {
    return this.filterCategoryId() ?? '__ALL__';
  }

  filteredTasks = computed(() => {
    const filter = this.filterCategoryId();
    const all = this.tasks();

    if (!filter) return all;

    return all.filter((t) => t.categoryId === filter);
  });

  async ngOnInit() {
    await this.loadData();
  }

  private async loadData() {
    const [tasks, categories] = await Promise.all([
      this.getTasksUC.execute(),
      this.getCategoriesUC.execute(),
    ]);

    this.tasks.set(
      tasks.map((t) => ({
        ...t,
        categoryId: t.categoryId ?? undefined,
      })),
    );

    this.categories.set(categories);
  }

  onFilterChange(value: string) {
    if (value === '__ALL__') {
      this.filterCategoryId.set(null);
    } else {
      this.filterCategoryId.set(value);
    }
  }

  async addTask(data: { title: string; categoryId?: string }) {
    await this.addTaskUC.execute(data.title, data.categoryId);
    await this.loadData();
  }

  async toggle(task: TaskEntity) {
    await this.toggleTaskUC.execute(task.id);
    await this.loadData();
  }

  async updateTask(task: TaskEntity) {
    await this.updateTaskUC.execute(task);
    await this.loadData();
  }

  async delete(task: TaskEntity) {
    await this.deleteTaskUC.execute(task.id);
    await this.loadData();
  }

  async clearAll() {
    await this.clearTasksUC.execute();
    await this.loadData();
  }

  getCategoryName(id?: string) {
    if (!id) return '';
    return this.categories().find((c) => c.id === id)?.name ?? '';
  }
}
