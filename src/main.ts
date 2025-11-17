import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@ionic/core/loader';
import { TaskRepository } from './app/domain/repositories/task.repository';
import { TaskRepositoryImpl } from './app/data/repositories/task.repository.impl';
import { CategoryRepositoryImpl } from './app/data/repositories/category.repository.impl';
import { CategoryRepository } from './app/domain/repositories/category.repository';

defineCustomElements(window);
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
    { provide: CategoryRepository, useClass: CategoryRepositoryImpl },
  ],
});
