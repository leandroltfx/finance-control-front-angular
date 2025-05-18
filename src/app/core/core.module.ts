import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MessageService } from './services/message/message.service';

@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule
  ],
  providers: [
    MessageService
  ]
})
export class CoreModule { }
