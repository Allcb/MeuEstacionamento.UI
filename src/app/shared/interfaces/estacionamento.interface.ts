import { ModelBase } from "./model-base.interface";

export interface Estacionamento extends ModelBase {
  nome?: string;
  quantidadeVagaGrande?: string;
  quantidadeVagaMedia?: string;
  quantidadeVagaPequena?: string;
}
