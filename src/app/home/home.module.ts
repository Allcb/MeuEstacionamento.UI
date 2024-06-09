import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [
    // CardComponent,
    // DashboardComponent,
    // IndicadorAtendimentoComponent,
    // IndicadoresComponent,
    // IndicadorFinanceiroComponent
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
