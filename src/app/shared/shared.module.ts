import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TranslateModule } from '@ngx-translate/core';

import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,

    TranslateModule,

    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    ErrorComponent
  ]
})
export class SharedModule { }
