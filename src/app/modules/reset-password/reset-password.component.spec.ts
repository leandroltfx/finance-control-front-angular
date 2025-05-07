import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let router: Router;

  beforeEach(() => {

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
        MatStepperModule,
        MatFormFieldModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
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

  describe('nextStep', () => {
    it('deve seguir para o passo seguinte da redefinição de senha', () => {

      component.nextStep('email');

      expect(component.stepper.selectedIndex).toBe(1);
    });
  });

  describe('backToLogin', () => {
    it('deve rotear para a tela de login', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.backToLogin();

      expect(navigateSpy).toHaveBeenCalled();
    });
  });
});
