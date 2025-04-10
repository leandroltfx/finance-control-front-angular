import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';

import { of, throwError } from 'rxjs';

import { Message } from '../../shared/enum/message.enum';
import { RoutesEnum } from '../../shared/enum/routes.enum';
import { ResetPasswordDto } from './models/dto/reset-password-dto';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordService } from './acl/service/reset-password.service';
import { MessageService } from '../../core/services/message/message.service';

describe('ResetPasswordComponent', () => {
  let router: Router;
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let resetPasswordServiceSpy: jasmine.SpyObj<ResetPasswordService>;

  beforeEach(() => {

    resetPasswordServiceSpy = jasmine.createSpyObj<ResetPasswordService>('ResetPasswordService', ['sendCode']);
    messageServiceSpy = jasmine.createSpyObj<MessageService>('MessageService', ['showMessage']);

    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ResetPasswordService, useValue: resetPasswordServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ResetPasswordComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendCode', () => {

    it('deve enviar o código para a redefinição de senha se o email estiver preenchido corretamente', () => {

      const resetPasswordDto: ResetPasswordDto = new ResetPasswordDto('Um código foi enviado para o email informado.');
      resetPasswordServiceSpy.sendCode.and.returnValue(of(resetPasswordDto));

      component.resetPasswordForm = component['_buildResetPasswordForm']();

      component.resetPasswordForm.controls['email'].setValue('email@email.com');

      component.sendCode();

      expect(resetPasswordServiceSpy.sendCode).toHaveBeenCalledWith('email@email.com');
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Um código foi enviado para o email informado.', 'success');
    });

    it('deve receber o erro HTTP em caso de falha no envio do código para a redefinição de senha', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro na redefinição de senha.' } });
      resetPasswordServiceSpy.sendCode.and.returnValue(throwError(() => httpErrorResponse));

      component.resetPasswordForm = component['_buildResetPasswordForm']();

      component.resetPasswordForm.controls['email'].setValue('email@email.com');

      component.sendCode();

      expect(resetPasswordServiceSpy.sendCode).toHaveBeenCalledWith('email@email.com');
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Ocorreu um erro na redefinição de senha.', 'error');
    });

    it('deve receber o erro HTTP em caso de falha na redefinição de senha e emitir a mensagem padrão caso o servidor esteja offline', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: {} });
      resetPasswordServiceSpy.sendCode.and.returnValue(throwError(() => httpErrorResponse));

      component.resetPasswordForm = component['_buildResetPasswordForm']();

      component.resetPasswordForm.controls['email'].setValue('email@email.com');

      component.sendCode();

      expect(resetPasswordServiceSpy.sendCode).toHaveBeenCalledWith('email@email.com');
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith(Message.DEFAULT_HTTP_ERROR_MESSAGE, 'error');
    });
  });

  describe('cancelResetPassword', () => {

    it('deve chamar a rota de login', () => {

      const navigateSpy = spyOn(router, 'navigate');

      component.cancelResetPassword();

      expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.LOGIN]);
    });
  });
});
