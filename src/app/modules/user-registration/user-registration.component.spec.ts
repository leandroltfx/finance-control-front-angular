import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { of, throwError } from 'rxjs';

import { Message } from '../../shared/enum/message.enum';
import { RoutesEnum } from '../../shared/enum/routes.enum';
import { UserRegistrationComponent } from './user-registration.component';
import { MessageService } from '../../core/services/message/message.service';
import { UserRegistrationService } from './acl/service/user-registration.service';
import { LoggedUserResponseContract, LoginResponseContract } from '../login/models/contracts/response/login-response-contract';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let router: Router;
  let userRegistrationServiceSpy: jasmine.SpyObj<UserRegistrationService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {

    userRegistrationServiceSpy = jasmine.createSpyObj<UserRegistrationService>('UserRegistrationService', ['registerUser']);
    messageServiceSpy = jasmine.createSpyObj<MessageService>('MessageService', ['showMessage']);

    TestBed.configureTestingModule({
      declarations: [UserRegistrationComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,

        TranslateModule.forRoot(),

        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
      ],
      providers: [
        { provide: UserRegistrationService, useValue: userRegistrationServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(UserRegistrationComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('registerUser', () => {
    it('deve realizar o cadastro de usuário se todos os campos forem preenchidos', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');
      component.userRegistrationForm.controls['confirmPassword'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).toHaveBeenCalledWith('username', 'email@email.com', 'asdasdasd');
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Cadastro realizado com sucesso!', 'success');
    });

    it('deve receber o erro HTTP em caso de falha no login', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro no cadastro.' } });
      userRegistrationServiceSpy.registerUser.and.returnValue(throwError(() => httpErrorResponse));

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');
      component.userRegistrationForm.controls['confirmPassword'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).toHaveBeenCalledWith('username', 'email@email.com', 'asdasdasd');
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Ocorreu um erro no cadastro.', 'error');
    });

    it('deve receber o erro HTTP em caso de falha no login e emitir a mensagem padrão caso o servidor esteja offline', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: {} });
      userRegistrationServiceSpy.registerUser.and.returnValue(throwError(() => httpErrorResponse));

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');
      component.userRegistrationForm.controls['confirmPassword'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).toHaveBeenCalledWith('username', 'email@email.com', 'asdasdasd');
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith(Message.DEFAULT_HTTP_ERROR_MESSAGE, 'error');
    });

    it('não deve realizar o cadastro de usuário se o nome de usuário estiver com caracter especial', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username#');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');
      component.userRegistrationForm.controls['confirmPassword'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se o nome de usuário estiver com espaços em branco no início', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue(' username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');
      component.userRegistrationForm.controls['confirmPassword'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se o nome de usuário estiver com espaços em branco no final', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username ');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');
      component.userRegistrationForm.controls['confirmPassword'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se o nome de usuário estiver com espaços em branco no meio', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('user name');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');
      component.userRegistrationForm.controls['confirmPassword'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se o email estiver fora do formato padrão', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('emailemail.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');
      component.userRegistrationForm.controls['confirmPassword'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se a senha estiver com menos de 8 caracteres', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasda');
      component.userRegistrationForm.controls['confirmPassword'].setValue('asdasda');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se a confirmação da senha estiver diferente da senha', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('zzzxxxccc');
      component.userRegistrationForm.controls['confirmPassword'].setValue('zzzxxxcccA');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });
  });

  describe('cancelRegisterUser', () => {
    it('deve rotear para a tela de login', () => {

      const navigateSpy = spyOn(router, 'navigate');

      component.cancelRegisterUser();

      expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.LOGIN]);
    });
  });

  describe('updateConfirmValidator', () => {
    it('deve atualizar a validação de senha se o campo senha for alterado posteriormente', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('senhacorreta');
      component.userRegistrationForm.controls['confirmPassword'].setValue('senhacorreta');

      component.updateConfirmValidator();

      expect(component.userRegistrationForm.controls['confirmPassword'].errors).toBeNull();

      component.userRegistrationForm.controls['confirmPassword'].setValue('alterandoconfirmacaosenha');

      component.updateConfirmValidator();

      expect(component.userRegistrationForm.controls['confirmPassword'].hasError('confirm')).toBeTrue();
    });
  });
});
