import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { MovementsComponent } from './movements.component';
import { SharedModule } from '../../../shared/shared.module';
import { MovementsService } from './acl/service/movements.service';
import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsProxyService } from './acl/proxy/movements-proxy.service';
import { MovementsAdapterService } from './acl/adapter/movements-adapter.service';

@NgModule({
  declarations: [
    MovementsComponent
  ],
  imports: [
    CommonModule,

    MatTableModule,

    SharedModule,
    MovementsRoutingModule
  ],
  providers: [
    MovementsService,
    MovementsProxyService,
    MovementsAdapterService,
  ]
})
export class MovementsModule { }
