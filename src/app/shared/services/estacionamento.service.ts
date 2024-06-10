import { Injectable, inject } from "@angular/core";
import { Http } from "./http.service";
import { Observable } from "rxjs";
import { Estacionamento } from "@shared/interfaces/estacionamento.interface";


@Injectable({
  providedIn: 'root',
})
export class EstacionamentoService {
  public route: string = '/estacionamentos';

  private http = inject(Http)

  public obterTodos(): Observable<Estacionamento[]> {
    return this.http.get(`${this.route}`);
  }

}
