import { HttpErrorResponse } from '@angular/common/http';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of, throwError } from 'rxjs';

import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordService } from './acl/service/reset-password.service';
import { ResetPasswordDto } from 'src/app/shared/model/dto/reset-password/reset-password-dto';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let resetPasswordServiceSpy: jasmine.SpyObj<ResetPasswordService>;
  let router: Router;

  beforeEach(() => {

    resetPasswordServiceSpy = jasmine.createSpyObj<ResetPasswordService>('ResetPasswordService', ['sendCodeToEmail']);

    TestBed.configureTestingModule({
      declarations: [
        ResetPasswordComponent
      ],
      imports: [
        ReactiveFormsModule,

        BrowserAnimationsModule,

        RouterTestingModule,

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
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendCodeToEmail', () => {
    it('deve chamar o serviço de redefinição de senha', () => {

      component.resetPasswordForm = component['_buildResetPasswordForm']();
      component.resetPasswordForm.controls['email'].setValue('email@email.com');
      const resetPasswordDto: ResetPasswordDto = new ResetPasswordDto('message');
      resetPasswordServiceSpy.sendCodeToEmail.and.returnValue(of(resetPasswordDto));

      component.sendCodeToEmail();

      expect(component.resetPasswordForm.valid).toBeTrue();
      expect(resetPasswordServiceSpy.sendCodeToEmail).toHaveBeenCalledWith('email@email.com');
    });

    it('deve chamar o serviço de redefinição de senha e tratar o erro se houver', () => {

      component.resetPasswordForm = component['_buildResetPasswordForm']();
      component.resetPasswordForm.controls['email'].setValue('email@email.com');
      resetPasswordServiceSpy.sendCodeToEmail.and.returnValue(throwError(() => new HttpErrorResponse({})));

      component.sendCodeToEmail();

      expect(component.resetPasswordForm.valid).toBeTrue();
      expect(resetPasswordServiceSpy.sendCodeToEmail).toHaveBeenCalledWith('email@email.com');
    });

    it('não deve chamar o serviço de redefinição de senha se o formulário estiver inválido por não preenchimento do email', () => {

      component.resetPasswordForm = component['_buildResetPasswordForm']();
      component.resetPasswordForm.controls['email'].setValue('');

      component.sendCodeToEmail();

      expect(resetPasswordServiceSpy.sendCodeToEmail).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de redefinição de senha se o formulário estiver inválido por conta de email fora do padrão', () => {

      component.resetPasswordForm = component['_buildResetPasswordForm']();
      component.resetPasswordForm.controls['email'].setValue('email');

      component.sendCodeToEmail();

      expect(resetPasswordServiceSpy.sendCodeToEmail).not.toHaveBeenCalled();
    });
  });

  describe('cancelResetPassword', () => {
    it('deve rotear para o login', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.cancelResetPassword();

      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });
});
