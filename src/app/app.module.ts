import * as angular from "angular";

import { NgModule } from "@angular/core";
import { LocationUpgradeModule } from "@angular/common/upgrade";
import { BrowserModule } from "@angular/platform-browser";
import { UpgradeModule } from "@angular/upgrade/static";
import { BehaviorSubject } from "rxjs";

import { AngularComponent } from "./angular.component";
import { UrlStatusComponent } from "./urlstatus.component";
import {APP_BASE_HREF} from '@angular/common';

const storedUseHash = sessionStorage.getItem('useHash');
const useHash = !storedUseHash || storedUseHash === 'true';


@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    LocationUpgradeModule.config({ useHash: useHash })
  ],
  providers: [
    { provide: "expectedUrl", useValue: new BehaviorSubject("/") },
    { provide: "useHash", useValue: useHash },
    {provide: APP_BASE_HREF, useValue: window.location.pathname},
  ],
  declarations: [AngularComponent, UrlStatusComponent],
  entryComponents: [AngularComponent, UrlStatusComponent]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}
  ngDoBootstrap() {
    // Ensure AngularJS destroys itself on hot reloads.
    if (window["$injector"]) {
      window["$injector"].get("$rootScope").$destroy();
    }
    console.log("Bootstrapping AppModule...");
    this.upgrade.bootstrap(document.body, ["angularjsmodule"]);
    window["$injector"] = (angular.element(document.body) as any).injector();
  }
}
