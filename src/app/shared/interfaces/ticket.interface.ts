import { ModelBase } from "./model-base.interface";

export interface Ticket extends ModelBase {
  estacionamento?: string;
  estacionamentoId?: string;
  tipoVeiculo?: string;
  tipoVeiculoId?: string;
  placa?: string;
  dataEntrada?: Date;
  dataSaida?: Date;
}
