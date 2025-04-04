import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of, throwError } from 'rxjs';

import { RoutesEnum } from '../../shared/enum/routes.enum';
import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationService } from './acl/service/user-registration.service';
import { LoggedUserResponseContract, LoginResponseContract } from '../login/models/contracts/response/login-response-contract';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let router: Router;
  let userRegistrationServiceSpy: jasmine.SpyObj<UserRegistrationService>;

  beforeEach(() => {

    userRegistrationServiceSpy = jasmine.createSpyObj<UserRegistrationService>('UserRegistrationService', ['registerUser']);

    TestBed.configureTestingModule({
      declarations: [
        UserRegistrationComponent
      ],
      imports: [
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserRegistrationService, useValue: userRegistrationServiceSpy }
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

      const navigateSpy = spyOn(router, 'navigate');

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).toHaveBeenCalledWith('username', 'email@email.com', 'asdasdasd');
    });

    it('deve receber o erro HTTP em caso de falha no login', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro no cadastro.' } });
      userRegistrationServiceSpy.registerUser.and.returnValue(throwError(() => httpErrorResponse));

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).toHaveBeenCalledWith('username', 'email@email.com', 'asdasdasd');
    });

    it('deve receber o erro HTTP em caso de falha no login e emitir a mensagem padrão caso o servidor esteja offline', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: {} });
      userRegistrationServiceSpy.registerUser.and.returnValue(throwError(() => httpErrorResponse));

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).toHaveBeenCalledWith('username', 'email@email.com', 'asdasdasd');
    });

    it('não deve realizar o cadastro de usuário se o nome de usuário estiver com caracter especial', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username#');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se o nome de usuário estiver com espaços em branco no início', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue(' username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se o nome de usuário estiver com espaços em branco no final', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username ');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se o nome de usuário estiver com espaços em branco no meio', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('user name');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se o email estiver fora do formato padrão', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('emailemail.com');
      component.userRegistrationForm.controls['password'].setValue('asdasdasd');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve realizar o cadastro de usuário se a senha estiver com menos de 8 caracteres', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'username', 'email@email.com'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginResponseContract));
      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('asdasda');

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
});
