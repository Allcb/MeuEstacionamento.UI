import { Injectable, inject } from "@angular/core";
import { Http } from "./http.service";
import { Observable } from "rxjs";
import { TipoVeiculo } from "@shared/interfaces/tipo-veiculo.interface";


@Injectable({
  providedIn: 'root',
})
export class TipoVeiculoService {
  public route: string = '/tipo-Veiculos';

  private http = inject(Http)

  public obterTodos(): Observable<TipoVeiculo[]> {
    return this.http.get(`${this.route}`);
  }

}
