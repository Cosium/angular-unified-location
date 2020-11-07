import { Component, Input, Inject } from "@angular/core";
import { Location } from "@angular/common";

const template = `
  <p> When <code>LocationUpgradeModule</code> is configured to <code>useHash: true</code>, AngularJS cannot set the path to a string which starts with a slash.  </p>



  Current configuration: <code>LocationUpgradeModule.config({{'{'}} useHash: {{useHash}} })</code>

  <p>
    You can toggle to <code>useHash: {{ !useHash }}</code> by clicking this button: 
    <button (click)="toggleLocationType()">Switch to useHash: {{ !useHash }}</button>
  </p>

  <hr>

  <p>
    This stackblitz starts with <code>useHash: true</code>.  Click each of the four buttons below (Angular/AngularJS) and compare the expected and actual urls.
  </p>


  <pre class="{{ matches() ? 'match' : 'nomatch' }}">

  expected url: {{ expectedUrl.value }}
    actual url: {{ actualUrl() }}
  </pre>
`;

@Component({
  selector: "url-status-component",
  template: template
})
export class UrlStatusComponent {
  constructor(
    @Inject("expectedUrl") public expectedUrl,
    @Inject("useHash") public useHash
  ) {}

  actualUrl() {
    return document.location.href.replace(/^https?:\/\/[^/]+/, "");
  }

  matches() {
    return this.expectedUrl.value === this.actualUrl();
  }

  toggleLocationType() {
    sessionStorage.setItem("useHash", (!this.useHash).toString());
    const refreshHref = document.location.href.replace(
      /^(https?:\/\/[^/]+).*/,
      "$1"
    );
    document.location.href = refreshHref;
  }
}
