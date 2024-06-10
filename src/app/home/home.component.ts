import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { load } from '@core/utils/load/load.component';
import { Estacionamento } from '@shared/interfaces/estacionamento.interface';
import { Ticket } from '@shared/interfaces/ticket.interface';
import { AlertService } from '@shared/services/alert.service';
import { EstacionamentoService } from '@shared/services/estacionamento.service';
import { TicketService } from '@shared/services/ticket.service';
import { TipoVeiculoService } from '@shared/services/tipo-veiculo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private alertService = inject(AlertService);
  private estacionamentoService = inject(EstacionamentoService);
  private tipoVeiculoService = inject(TipoVeiculoService);
  private ticketService = inject(TicketService);
  private formBuilder = inject(FormBuilder);

  public estacionamentos: Estacionamento[] = [];
  public estacionamentoSelecionado: Estacionamento;
  public mostrarFormulario: boolean = false;
  public ticket: Ticket = {};
  public ticketFormulario: FormGroup;
  public tipoVeiculos$ = this.tipoVeiculoService.obterTodos();

  constructor(
  ) {
    this.ticketFormulario = this.formBuilder.group({
      placa: ['', [Validators.required]],
      tipoVeiculoId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.obterEstacionamentos();
  }

  public obterEstacionamentos(): void {
    this.estacionamentoService.obterTodos().subscribe((estacionamento) => {
      this.estacionamentos = estacionamento

      if (this.estacionamentos.length > 0) {
        this.estacionamentoSelecionado = this.estacionamentos[0];
      }
    });
  }

  public aoAlterarEstacionamento(event: any): void {
    this.estacionamentoSelecionado = event.value;
  }

  public exibirFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  public cadastrar(): void {
    if (this.ticketFormulario.valid) {

      this.ticket = { ...this.ticketFormulario.value, };
      this.ticket.estacionamentoId = this.estacionamentoSelecionado?.id;

      load.show();
      this.ticketService.gerarTicket(this.ticket)
        .subscribe({
          next: () => {
            load.hide();
            this.alertService.success(
              `Ticket cadastrado com sucesso. Por favor, dirija-se até sua vaga.`
            );

            this.ticketFormulario.reset();
          },
          error: (error) => {
            load.hide();
            this.alertService.error(error);
          },
        });

      this.exibirFormulario()
    }
  }
}
