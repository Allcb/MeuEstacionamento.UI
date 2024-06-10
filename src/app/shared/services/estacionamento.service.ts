import { Injectable, inject } from "@angular/core";
import { Http } from "./http.service";
import { Observable } from "rxjs";
import { Estacionamento } from "@shared/interfaces/estacionamento.interface";
import { EstacionamentoStatusVaga } from "@shared/interfaces/estacionamento-status-vaga.interface";


@Injectable({
  providedIn: 'root',
})
export class EstacionamentoService {
  public route: string = '/estacionamentos';

  private http = inject(Http)

  public obterTodos(): Observable<Estacionamento[]> {
    return this.http.get(`${this.route}`);
  }

  public verificarEstacionamentoCheio(estacionamentoId: string): Observable<boolean> {
    return this.http.get(`${this.route}/cheio/${estacionamentoId}`);
  }

  public verificarEstacionamentoVazio(estacionamentoId: string): Observable<boolean> {
    return this.http.get(`${this.route}/vazio/${estacionamentoId}`);
  }

  public obterStatusVagas(estacionamentoId: string): Observable<EstacionamentoStatusVaga> {
    return this.http.get(`${this.route}/status-vagas/${estacionamentoId}`);
  }

  public obterTotalVagasOcupadaVan(estacionamentoId: string): Observable<number> {
    return this.http.get(`${this.route}/total-vagas-ocupadas-van/${estacionamentoId}`);
  }

  public obterTotalVagasLivres(estacionamentoId: string): Observable<number> {
    return this.http.get(`${this.route}/total-vagas-disponivel/${estacionamentoId}`);
  }

  public obterTotalVagas(estacionamentoId: string): Observable<Estacionamento> {
    return this.http.get(`${this.route}/total-vagas/${estacionamentoId}`);
  }

}
