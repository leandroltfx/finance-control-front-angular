import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsComponent } from './movements.component';
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

    MovementsRoutingModule,
  ],
  providers: [
    MovementsService,
    MovementsProxyService,
    MovementsAdapterService,
  ]
})
export class MovementsModule { }
