import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginComponent } from './login.component';
import { LoginService } from './acl/service/login.service';
import { of, throwError } from 'rxjs';
import { LoginResponseContract } from './models/contracts/response/login-response-contract';
import { LoginDto } from './models/dto/login-dto';
import { LoggedUserDto } from './models/logged-user/logged-user-dto';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(() => {

    loginServiceSpy = jasmine.createSpyObj<LoginService>('LoginService', ['login']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,

        TranslateModule.forRoot(),

        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('deve realizar o login caso email e senha tenham sido preenchidos', () => {

      const loginDto: LoginDto = new LoginDto('Login efetuado com sucesso!', new LoggedUserDto('username', 'email'));
      loginServiceSpy.login.and.returnValue(of(loginDto));

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(loginServiceSpy.login).toHaveBeenCalledWith('email@email.com', 'asd123');
    });

    it('deve receber o erro HTTP em caso de falha no login', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});
      loginServiceSpy.login.and.returnValue(throwError(() => httpErrorResponse));

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(loginServiceSpy.login).toHaveBeenCalledWith('email@email.com', 'asd123');
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
});
