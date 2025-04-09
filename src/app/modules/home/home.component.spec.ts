import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home.component';
import { RoutesEnum } from '../../shared/enum/routes.enum';

describe('HomeComponent', () => {
  let router: Router;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        BrowserAnimationsModule,

        TranslateModule.forRoot()
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('goToBankAccounts', () => {
    it('deve rotear para o módulo de contas bancárias dentro da rota ativa da home', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.goToBankAccounts();

      expect(navigateSpy).toHaveBeenCalledWith([`${RoutesEnum.HOME}/${RoutesEnum.BANK_ACCOUNTS}`]);
    });
  });
});
