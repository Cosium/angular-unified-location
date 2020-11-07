import * as angular from 'angular';
import { enableProdMode, NgZone } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './angularjs.module';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  // Ensure Angular destroys itself on hot reloads.
  window['platformRef'] && window['platformRef'].destroy();
  window['platformRef'] = null
  }).catch(err => console.error("Error bootstrapping AppModule", err));