import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

// If cordova is present, wait for it to initialize, otherwise just try to
// bootstrap the application without Cordova.
// this.bindEvents = function () {
//   document.addEventListener('deviceready', function () {
//      platformBrowserDynamic().bootstrapModule(AppModule);
//   }, false);
// };

// if (window.cordova !== undefined) {
//   // this.bindEvents();
// } else {
//   console.log('no device');
//   platformBrowserDynamic().bootstrapModule(AppModule);
// }

