import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingComponent } from './loading.component';
import { LoadingService } from '../../services/loading/loading.service';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingService: LoadingService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        LoadingComponent,
      ],
      providers: [
        LoadingService,
      ],
      imports: [
        MatProgressSpinnerModule,
      ]
    });
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService);
    spyOn(loadingService.event$, 'subscribe').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('event$', () => {
    it('deve se inscrever no observable event$', () => {
      expect(loadingService.event$.subscribe).toHaveBeenCalled();
    });
  });

  describe('emitEvent', () => {
    it('deve emitir evento para mostrar e esconder o loading', () => {
      loadingService.emitEvent(true);
      fixture.detectChanges();

      expect(component.showLoading).toBeTrue();

      loadingService.emitEvent(false);
      fixture.detectChanges();

      expect(component.showLoading).toBeFalse();
    });
  });
});
