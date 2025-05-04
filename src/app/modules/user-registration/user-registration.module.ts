import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationRoutingModule } from './user-registration-routing.module';

@NgModule({
  declarations: [
    UserRegistrationComponent
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,

    UserRegistrationRoutingModule
  ]
})
export class UserRegistrationModule { }
