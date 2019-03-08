import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider
  } from 'angularx-social-login';
  
  export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('402019200568297')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("947457343161-alh7s7kgt8duj7h2ln5fueio6c1fknts.apps.googleusercontent.com") 
      }
    ]);
    return config;
  }