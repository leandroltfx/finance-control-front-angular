import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginComponent } from './login.component';
import { LoginService } from './acl/service/login.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginProxyService } from './acl/proxy/login-proxy.service';
import { LoginAdapterService } from './acl/adapter/login-adapter.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,

    LoginRoutingModule
  ],
  providers: [
    LoginService,
    LoginProxyService,
    LoginAdapterService,
  ]
})
export class LoginModule { }
