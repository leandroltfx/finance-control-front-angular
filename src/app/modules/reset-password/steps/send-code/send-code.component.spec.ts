import { HttpErrorResponse } from '@angular/common/http';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of, throwError } from 'rxjs';

import { SendCodeComponent } from './send-code.component';
import { ResetPasswordService } from '../../acl/service/reset-password.service';

describe('SendCodeComponent', () => {
  let component: SendCodeComponent;
  let fixture: ComponentFixture<SendCodeComponent>;
  let resetPasswordServiceSpy: jasmine.SpyObj<ResetPasswordService>;

  beforeEach(() => {

    resetPasswordServiceSpy = jasmine.createSpyObj<ResetPasswordService>('ResetPasswordService', ['sendCodeToEmail']);

    TestBed.configureTestingModule({
      declarations: [
        SendCodeComponent
      ],
      imports: [
        ReactiveFormsModule,

        BrowserAnimationsModule,

        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: ResetPasswordService, useValue: resetPasswordServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(SendCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendCodeToEmail', () => {
    it('deve chamar o serviço de redefinição de senha', () => {

      component.sendCodeForm = component['_buildSendCodeForm']();
      component.sendCodeForm.controls['email'].setValue('email@email.com');
      resetPasswordServiceSpy.sendCodeToEmail.and.returnValue(of(undefined));

      component.sendCodeToEmail();

      expect(component.sendCodeForm.valid).toBeTrue();
      expect(resetPasswordServiceSpy.sendCodeToEmail).toHaveBeenCalledWith('email@email.com');
    });

    it('deve chamar o serviço de redefinição de senha e tratar o erro se houver', () => {

      component.sendCodeForm = component['_buildSendCodeForm']();
      component.sendCodeForm.controls['email'].setValue('email@email.com');
      resetPasswordServiceSpy.sendCodeToEmail.and.returnValue(throwError(() => new HttpErrorResponse({})));

      component.sendCodeToEmail();

      expect(component.sendCodeForm.valid).toBeTrue();
      expect(resetPasswordServiceSpy.sendCodeToEmail).toHaveBeenCalledWith('email@email.com');
    });

    it('não deve chamar o serviço de redefinição de senha se o formulário estiver inválido por não preenchimento do email', () => {

      component.sendCodeForm = component['_buildSendCodeForm']();
      component.sendCodeForm.controls['email'].setValue('');

      component.sendCodeToEmail();

      expect(resetPasswordServiceSpy.sendCodeToEmail).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de redefinição de senha se o formulário estiver inválido por conta de email fora do padrão', () => {

      component.sendCodeForm = component['_buildSendCodeForm']();
      component.sendCodeForm.controls['email'].setValue('email');

      component.sendCodeToEmail();

      expect(resetPasswordServiceSpy.sendCodeToEmail).not.toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('deve emitir evento para cancelar o fluxo de redefinição de senha e voltar ao login', () => {
      const emitSpy = spyOn(component.eventBackToLogin, 'emit');

      component.cancel();

      expect(emitSpy).toHaveBeenCalled();
    });
  });
});
