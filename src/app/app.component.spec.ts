import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

describe('AppComponent', () => {
  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,

      TranslateModule.forRoot(),

      CoreModule,
    ],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
