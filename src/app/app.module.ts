import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { FilterByPipe } from './shared/pipes/filter-by.pipe';
import { FormsModule } from '@angular/forms';
import { SimpleDatePipe } from './shared/pipes/simple-date.pipe';
import { RealCurrencyPipe } from './shared/pipes/real-currency.pipe';
import { TestandoComponent } from './testando/testando.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterByPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    CoreModule,
    AppRoutingModule,
    TestandoComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
