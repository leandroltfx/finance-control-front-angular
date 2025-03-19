import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading/loading.service';

describe('LoadingInterceptor', () => {

  let loadingService: LoadingService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoadingInterceptor,
        LoadingService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true
        }
      ]
    });

    loadingService = TestBed.inject(LoadingService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    const interceptor: LoadingInterceptor = TestBed.inject(LoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    it('deve emitir evento para abrir tela de loading ao interceptar uma requisição http e depois fechar quando completar a requisição', () => {
      spyOn(loadingService, 'emitEvent');

      httpClient.get('/test').subscribe();

      expect(loadingService.emitEvent).toHaveBeenCalledWith(true);

      const req = httpMock.expectOne('/test');
      req.flush({});
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
