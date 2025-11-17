import { Injectable, signal } from '@angular/core';
import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { FirebaseService } from './firebase.service';
import { environment } from '../../../environments/environment';
import { App } from '@capacitor/app';
import { constants } from '../constants/firebase.constanst';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  private showCategories = signal<boolean>(false);
  categoriesEnabled = this.showCategories;

  private autoRefreshIntervalId: any;

  constructor(private firebase: FirebaseService) {}

  async init() {
    await this.updateValues();
    this.startAutoRefresh(constants.autoRefreshInterval);
    this.listenToForeground();
  }

  private async updateValues() {
    try {
      await fetchAndActivate(this.firebase.remoteConfig);

      const key = environment.remoteConfig.flags.showCategoriesFeature;
      const value = getValue(this.firebase.remoteConfig, key).asBoolean();

      this.showCategories.set(value);
      console.log('[RemoteConfig] categoriesEnabled =', value);
    } catch (err) {
      console.warn('[RemoteConfig] Error al actualizar valores', err);
    }
  }

  private startAutoRefresh(intervalMs: number) {
    if (this.autoRefreshIntervalId) {
      clearInterval(this.autoRefreshIntervalId);
    }

    this.autoRefreshIntervalId = setInterval(async () => {
      await this.updateValues();
    }, intervalMs);
  }

  private listenToForeground() {
    App.addListener('appStateChange', async ({ isActive }) => {
      if (isActive) {
        console.log('[RemoteConfig] appStateChange → activa, refrescando RC');
        await this.updateValues();
      }
    });
  }

  showCategoriesFeature(): boolean {
    return this.showCategories();
  }
}
