import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-load></app-load><router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'MeuEstacionamento';
}
