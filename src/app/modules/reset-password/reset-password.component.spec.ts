import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { of, throwError } from 'rxjs';

import { RoutesEnum } from '../../shared/enum/routes.enum';
import { ResetPasswordDto } from './models/dto/reset-password-dto';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordService } from './acl/service/reset-password.service';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let router: Router;
  let resetPasswordServiceSpy: jasmine.SpyObj<ResetPasswordService>;

  beforeEach(() => {

    resetPasswordServiceSpy = jasmine.createSpyObj<ResetPasswordService>('ResetPasswordService', ['resetPassword']);

    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,

        TranslateModule.forRoot(),

        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
      ],
      providers: [
        { provide: ResetPasswordService, useValue: resetPasswordServiceSpy }
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

  describe('recoverPassword', () => {

    it('deve realizar a redefinição de senha se o email estiver preenchido corretamente', () => {

      const resetPasswordDto: ResetPasswordDto = new ResetPasswordDto('Um link de redefinição de senha foi enviado para o email informado');
      resetPasswordServiceSpy.resetPassword.and.returnValue(of(resetPasswordDto));

      component.recoverPasswordForm = component['_buildRecoverPasswordForm']();

      component.recoverPasswordForm.controls['email'].setValue('email@email.com');

      component.recoverPassword();

      expect(resetPasswordServiceSpy.resetPassword).toHaveBeenCalledWith('email@email.com');
    });

    it('deve receber o erro HTTP em caso de falha na redefinição de senha', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});
      resetPasswordServiceSpy.resetPassword.and.returnValue(throwError(() => httpErrorResponse));

      component.recoverPasswordForm = component['_buildRecoverPasswordForm']();

      component.recoverPasswordForm.controls['email'].setValue('email@email.com');

      component.recoverPassword();

      expect(resetPasswordServiceSpy.resetPassword).toHaveBeenCalledWith('email@email.com');
    });
  });

  describe('goToLogin', () => {

    it('deve chamar a rota de login', () => {

      const navigateSpy = spyOn(router, 'navigate');

      component.goToLogin();

      expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.LOGIN]);
    });
  });
});
