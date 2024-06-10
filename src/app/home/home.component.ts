import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estacionamento } from '@shared/interfaces/estacionamento.interface';
import { EstacionamentoService } from '@shared/services/estacionamento.service';
import { TipoVeiculoService } from '@shared/services/tipo-veiculo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private estacionamentoService = inject(EstacionamentoService)
  private tipoVeiculoService = inject(TipoVeiculoService)
  private formBuilder = inject(FormBuilder)

  public estacionamentos: Estacionamento[] = [];
  public estacionamentoSelecionado: Estacionamento;
  public tipoVeiculos$= this.tipoVeiculoService.obterTodos();
  public ticketFormulario: FormGroup;
  public mostrarFormulario: boolean = false;

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
      const ticketData = this.ticketFormulario.value;
      // Process the ticket data, e.g., send it to the API
      console.log('Ticket Data:', ticketData);
    }
  }
}
