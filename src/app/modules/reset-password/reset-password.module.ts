import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    ReactiveFormsModule,

    TranslateModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,

    ResetPasswordRoutingModule,
  ],
  providers: [
    ResetPasswordService,
    ResetPasswordProxyService,
    ResetPasswordAdapterService,
  ]
})
export class RecoverPasswordModule { }
