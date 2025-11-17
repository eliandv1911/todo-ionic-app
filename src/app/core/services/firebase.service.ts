import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getRemoteConfig, RemoteConfig } from 'firebase/remote-config';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  app: FirebaseApp;
  remoteConfig: RemoteConfig;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.remoteConfig = getRemoteConfig(this.app);

    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: environment.remoteConfig.minimumFetchIntervalMillis,
      fetchTimeoutMillis: environment.remoteConfig.fetchTimeoutMillis,
    };
    this.remoteConfig.defaultConfig = {
      [environment.remoteConfig.flags.showCategoriesFeature]: true,
    };
  }
}
