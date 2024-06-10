import { ModelBase } from "./model-base.interface";

export interface Estacionamento extends ModelBase {
  nome?: string;
  quantidadeVagaGrande: number;
  quantidadeVagaMedia: number;
  quantidadeVagaPequena: number;
  quantidadeTotal: number;
}
