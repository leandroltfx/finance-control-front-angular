import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadingService,
      ]
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('emitEvent', () => {
    it('deve emitir evento para os subscribers', (done) => {

      service.event$.subscribe((event) => {
        expect(event).toBe(true);
        done();
      });

      service.emitEvent(true);
    });
  });
});
