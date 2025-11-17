export const environment = {
  production: false,
  firebase: {
    apiKey: 'REPLACE_ME',
    authDomain: 'REPLACE_ME',
    projectId: 'REPLACE_ME',
    appId: 'REPLACE_ME',
  },
  remoteConfig: {
    minimumFetchIntervalMillis: 60000,
    fetchTimeoutMillis: 10_000,
    flags: {
      showCategoriesFeature: 'show_categories_feature',
    },
  },
};
