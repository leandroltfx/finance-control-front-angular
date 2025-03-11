import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsComponent } from './movements.component';
import { MovementsRoutingModule } from './movements-routing.module';

@NgModule({
  declarations: [
    MovementsComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule
  ]
})
export class MovementsModule { }
