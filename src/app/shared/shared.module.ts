import { NgModule } from "@angular/core";
import { MaterialModule } from "./modules/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { AlertComponent, AlertService } from "./services/alert.service";

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AlertComponent
  ],
  exports: [
    FormsModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    AlertService,
  ],
})
export class SharedModule { }
