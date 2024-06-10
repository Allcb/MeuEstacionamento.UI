import { Component, OnInit } from '@angular/core';

let mostrarLoad: boolean;
export let load = {
  /**
   * Exibe o load em Fullscreen
   */
  show() {
    mostrarLoad = true;
  },
  /**
   * Esconde o load em Fullscreen
   */
  hide() {
    mostrarLoad = false;
  },
};

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent {
  public mostrarLoad: boolean = false;

  public get loading() {
    return mostrarLoad;
  }
}
