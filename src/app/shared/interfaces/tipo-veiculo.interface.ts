import { ModelBase } from "./model-base.interface";

export interface TipoVeiculo extends ModelBase {
  descricao?: string;
  porte?: string;
}
