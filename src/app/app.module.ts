import { CoreModule } from './core/core.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LayoutModule } from './core/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { LoadComponent } from './core/utils/load/load.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: MAT_DATE_LOCALE,
    useValue: "pt-BR"
  },
  {
    provide: LOCALE_ID,
    useValue: "pt"
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
