import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';

import { of, throwError } from 'rxjs';

import { LoginDto } from './models/dto/login-dto';
import { LoginComponent } from './login.component';
import { RoutesEnum } from '../../shared/enum/routes.enum';
import { LoginService } from './acl/service/login.service';
import { LoggedUserDto } from './models/logged-user/logged-user-dto';
import { MessageService } from '../../core/services/message/message.service';

describe('LoginComponent', () => {
  let router: Router;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {

    loginServiceSpy = jasmine.createSpyObj<LoginService>('LoginService', ['login']);
    messageServiceSpy = jasmine.createSpyObj<MessageService>('MessageService', ['showMessage']);

    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,

        TranslateModule.forRoot()
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('deve realizar o login caso email e senha tenham sido preenchidos', () => {

      const navigateSpy = spyOn(router, 'navigate');

      const loginDto: LoginDto = new LoginDto('Login efetuado com sucesso!', new LoggedUserDto('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'username', 'email'));
      loginServiceSpy.login.and.returnValue(of(loginDto));

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(loginServiceSpy.login).toHaveBeenCalledWith('email@email.com', 'asd123');
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Login efetuado com sucesso!', 'success');
      expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.HOME]);
    });

    it('deve receber o erro HTTP em caso de falha no login', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro no login.' } });
      loginServiceSpy.login.and.returnValue(throwError(() => httpErrorResponse));

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(loginServiceSpy.login).toHaveBeenCalledWith('email@email.com', 'asd123');
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Ocorreu um erro no login.', 'error');
    });

    it('deve receber o erro HTTP em caso de falha no login e emitir a mensagem padrão caso o servidor esteja offline', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: {} });
      loginServiceSpy.login.and.returnValue(throwError(() => httpErrorResponse));

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(loginServiceSpy.login).toHaveBeenCalledWith('email@email.com', 'asd123');
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Servidor indisponível. Tente novamente mais tarde.', 'error');
    });

    it('não deve realizar o login caso o email não tenha sido preenchido', () => {

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(loginServiceSpy.login).not.toHaveBeenCalled();
    });

    it('não deve realizar o login caso a senha não tenha sido preenchida', () => {

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');

      component.login();

      expect(loginServiceSpy.login).not.toHaveBeenCalled();
    });

    it('não deve realizar o login caso email e senha não tenham sido preenchidos', () => {

      component.loginForm = component['_buildLoginForm']();

      component.login();

      expect(loginServiceSpy.login).not.toHaveBeenCalled();
    });
  });

  describe('goToUserRegistration', () => {

    it('deve rotear para o módulo de cadastro de usuário', () => {

      const navigateSpy = spyOn(router, 'navigate');

      component.goToUserRegistration();

      expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.USER_REGISTRATION]);
    });
  });

  describe('goToResetPassword', () => {

    it('deve rotear para o módulo de recuperação de senha', () => {

      const navigateSpy = spyOn(router, 'navigate');

      component.goToResetPassword();

      expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.RESET_PASSWORD]);
    });
  });

});
