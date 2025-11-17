import { Component, computed, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { RemoteConfigService } from '../../../core/services/remote-config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, RouterLink],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private remoteConfig = inject(RemoteConfigService);

  showCategories = computed(() => this.remoteConfig.categoriesEnabled());
  constructor() {}
}
