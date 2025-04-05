import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TranslateModule } from '@ngx-translate/core';

import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordService } from './acl/service/reset-password.service';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordProxyService } from './acl/proxy/reset-password-proxy.service';
import { ResetPasswordAdapterService } from './acl/adapter/reset-password-adapter.service';

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,

    TranslateModule,

    ResetPasswordRoutingModule
  ],
  providers: [
    ResetPasswordService,
    ResetPasswordProxyService,
    ResetPasswordAdapterService,
  ]
})
export class ResetPasswordModule { }
