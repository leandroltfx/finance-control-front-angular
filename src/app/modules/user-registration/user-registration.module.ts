import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationRoutingModule } from './user-registration-routing.module';

@NgModule({
  declarations: [
    UserRegistrationComponent
  ],
  imports: [
    CommonModule,
    UserRegistrationRoutingModule
  ]
})
export class UserRegistrationModule { }
