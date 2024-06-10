import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { IndicadorEstacionamentoComponent } from "./indicadores/indicador-estacionamento/indicador-estacionamento.component";

@NgModule({
  declarations: [
    HomeComponent,
    IndicadorEstacionamentoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  schemas: [
  ]
})
export class HomeModule { }
