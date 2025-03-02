import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,

        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
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
    it('deve logar mensagem de sucesso caso email e senha tenham sido preenchidos', () => {

      const logSpy = spyOn(console, 'log');

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(logSpy).toHaveBeenCalledWith('Login Form is valid!');
    });

    it('deve logar mensagem de erro caso o email não tenha sido preenchido', () => {

      const errorSpy = spyOn(console, 'error');

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(errorSpy).toHaveBeenCalledWith('Login Form is invalid!');
    });

    it('deve logar mensagem de erro caso a senha não tenha sido preenchida', () => {

      const errorSpy = spyOn(console, 'error');

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');

      component.login();

      expect(errorSpy).toHaveBeenCalledWith('Login Form is invalid!');
    });

    it('deve logar mensagem de erro caso email e senha não tenham sido preenchidos', () => {

      const errorSpy = spyOn(console, 'error');

      component.loginForm = component['_buildLoginForm']();

      component.login();

      expect(errorSpy).toHaveBeenCalledWith('Login Form is invalid!');
    });
  });
});
