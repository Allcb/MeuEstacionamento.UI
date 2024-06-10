import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { EstacionamentoStatusVaga } from '@shared/interfaces/estacionamento-status-vaga.interface';
import { Estacionamento } from '@shared/interfaces/estacionamento.interface';
import { EstacionamentoService } from '@shared/services/estacionamento.service';

@Component({
  selector: 'app-indicador-estacionamento',
  templateUrl: './indicador-estacionamento.component.html',
  styleUrl: './indicador-estacionamento.component.scss'
})
export class IndicadorEstacionamentoComponent implements OnInit, OnChanges {
  @Input() estacionamentoId: string;

  private estacionamentoService = inject(EstacionamentoService);

  public vagasRestantes: number;
  public vagasTotais: number;
  public estacionamentoCheio: boolean;
  public estacionamentoVazio: boolean;
  public vagasVanOcupadas: number;
  public statusVagasEstacionamento: EstacionamentoStatusVaga = {};

  constructor() {

  }

  ngOnInit(): void {
    this.obterMetricas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estacionamentoId']) {
      this.estacionamentoId = changes['estacionamentoId'].currentValue;
      this.obterMetricas();
    }
  }

  public obterMetricas(): void {
    this.verificarEstacionamento();
    this.obterTotalVagasOcupadasVan();
    this.obterTotalVagasLivres();
    this.obterTotalVagas();
    this.obterStatusVagas();
  }

  public verificarEstacionamento(): void {
    this.estacionamentoService.verificarEstacionamentoCheio(this.estacionamentoId).subscribe((retornoValidacao) => {
      this.estacionamentoCheio = retornoValidacao;
    });

    this.estacionamentoService.verificarEstacionamentoVazio(this.estacionamentoId).subscribe((retornoValidacao) => {
      this.estacionamentoVazio = retornoValidacao;
    });
  }

  public obterTotalVagasOcupadasVan(): void {
    this.estacionamentoService.obterTotalVagasOcupadaVan(this.estacionamentoId).subscribe((quantidadeVagasOcupadas) => {
      this.vagasVanOcupadas = quantidadeVagasOcupadas;
    });
  }

  public obterTotalVagasLivres(): void {
    this.estacionamentoService.obterTotalVagasLivres(this.estacionamentoId).subscribe((quantidadeVagasLivres) => {
      this.vagasRestantes = quantidadeVagasLivres;
    });
  }

  public obterTotalVagas(): void {
    this.estacionamentoService.obterTotalVagas(this.estacionamentoId).subscribe((quantidadeVagas: Estacionamento) => {
      this.vagasTotais = quantidadeVagas.quantidadeTotal;
    });
  }

  public obterStatusVagas(): void {
    this.estacionamentoService.obterStatusVagas(this.estacionamentoId).subscribe((statusVagasEstacionamento: EstacionamentoStatusVaga) => {
      this.statusVagasEstacionamento = statusVagasEstacionamento;
    });
  }
}
