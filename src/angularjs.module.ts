import * as angular from "angular";
import { downgradeComponent } from "@angular/upgrade/static";
import { AngularComponent } from "./app/angular.component";
import { UrlStatusComponent } from "./app/urlstatus.component";
import { $locationShim } from "@angular/common/upgrade";
import { downgradeInjectable } from "@angular/upgrade/static";

const ngmodule = angular
  .module("angularjsmodule", [])
  .factory("$location", downgradeInjectable($locationShim))
  .factory('expectedUrl', downgradeInjectable("expectedUrl"))
  .factory('useHash', downgradeInjectable("useHash"))
  .directive("angularComponent", downgradeComponent({ component: AngularComponent }))
  .directive("urlStatusComponent", downgradeComponent({ component: UrlStatusComponent }))
  .component("angularjsComponent", {
    template: `
    <h1>AngularJS</h1> 
    <button ng-click="$ctrl.routeTo('/slash')"><pre>$location.path("/slash")</pre></button>
    <button ng-click="$ctrl.routeTo('noslash')"><pre>$location.path("noslash")</pre></button>
  `,
    controller: function($location, expectedUrl, useHash) {
      this.routeTo = path => {
        expectedUrl.next(getExpectedUrl(path));
        // Clear the hash... sometimes the existing hash value is tacked onto the
        // end of the new url when switching between Angular and AngularJS buttons
        $location.hash(''); 
        $location.path(path);
      };


      function getExpectedUrl(path) {
        if (useHash) return "/#" + path;
        return path.charAt(0) == '/' ? path : '/' + path;
      }
    }
  });
