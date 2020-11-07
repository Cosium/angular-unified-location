import { Component, Input, Inject } from "@angular/core";
import { Location } from "@angular/common";

const template = `
  <h1>Angular</h1>
  <button (click)="setPath('/slash')"><pre>location.go("/slash")</pre></button>
  <button (click)="setPath('noslash')"><pre>location.go("noslash")</pre></button>
`;

@Component({
  selector: "angular-component",
  template: template
})
export class AngularComponent {
  constructor(
    private location: Location,
    @Inject("expectedUrl") public expectedUrl,
    @Inject("useHash") public useHash,
  ) {}

  getExpectedUrl(path) {
    if (this.useHash) return "/#" + path;
    return path.charAt(0) == '/' ? path : '/' + path;
  }

  setPath(path) {
    this.expectedUrl.next(this.getExpectedUrl(path))
    this.location.go(path);
  }
}
