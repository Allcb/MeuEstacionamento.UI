import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { HeaderComponent } from "./header/header.component";
import { PageComponent } from "./page/page.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageComponent
  ],
})
export class LayoutModule { }
