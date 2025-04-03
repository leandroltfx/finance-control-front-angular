import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
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
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,

    LoginRoutingModule
  ],
  providers: [
    LoginService,
    LoginProxyService,
    LoginAdapterService
  ]
})
export class LoginModule { }
