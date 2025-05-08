import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ResetPasswordComponent } from './reset-password.component';
import { SendCodeComponent } from './steps/send-code/send-code.component';
import { ResetPasswordService } from './acl/service/reset-password.service';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { NewPasswordComponent } from './steps/new-password/new-password.component';
import { ResetPasswordProxyService } from './acl/proxy/reset-password-proxy.service';
import { ValidateCodeComponent } from './steps/validate-code/validate-code.component';
import { ResetPasswordAdapterService } from './acl/adapter/reset-password-adapter.service';

@NgModule({
  declarations: [
    SendCodeComponent,
    NewPasswordComponent,
    ValidateCodeComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,

    ResetPasswordRoutingModule
  ],
  providers: [
    ResetPasswordService,
    ResetPasswordProxyService,
    ResetPasswordAdapterService
  ]
})
export class ResetPasswordModule { }
