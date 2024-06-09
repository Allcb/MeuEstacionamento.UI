import { NgModule } from "@angular/core";
import { MaterialModule } from "./modules/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
// import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    // NgxMaskModule.forRoot(),
  ],
  declarations: [ ],
  exports: [
    FormsModule,
    // LazyImgDirective,
    MatCardModule,
    MaterialModule,
    // NgxMaskModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
  ],
})
export class SharedModule { }
