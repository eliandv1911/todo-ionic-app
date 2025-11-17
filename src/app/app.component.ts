import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RemoteConfigService } from './core/services/remote-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private remoteConfig = inject(RemoteConfigService);

  constructor() {}

  ngOnInit(): void {
    this.initRemoteConfig();
  }

  private async initRemoteConfig() {
    try {
      await this.remoteConfig.init();
    } catch (err) {
      console.error('[AppComponent] RemoteConfig error', err);
    }
  }
}
