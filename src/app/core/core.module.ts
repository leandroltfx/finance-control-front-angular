import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from './services/auth/auth.service';
import { LoadingService } from './services/loading/loading.service';
import { MessageService } from './services/message/message.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,

    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AuthService,
    LoadingService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  exports: [
    LoadingComponent,
  ]
})
export class CoreModule { }
