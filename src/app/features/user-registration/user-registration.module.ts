import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TranslateModule } from '@ngx-translate/core';

import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationService } from './acl/service/user-registration.service';
import { UserRegistrationRoutingModule } from './user-registration-routing.module';
import { UserRegistrationProxyService } from './acl/proxy/user-registration-proxy.service';
import { UserRegistrationAdapterService } from './acl/adapter/user-registration-adapter.service';

@NgModule({
  declarations: [
    UserRegistrationComponent
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

    TranslateModule,

    UserRegistrationRoutingModule
  ],
  providers: [
    UserRegistrationService,
    UserRegistrationProxyService,
    UserRegistrationAdapterService,
  ]
})
export class UserRegistrationModule { }
