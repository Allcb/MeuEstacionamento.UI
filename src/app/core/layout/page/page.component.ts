import { Component } from "@angular/core";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  public mainOpened: boolean;

  constructor() {
    this.mainOpened = false;
  }

  changeMenu(value: boolean) {
    this.mainOpened = value;
  }
}
