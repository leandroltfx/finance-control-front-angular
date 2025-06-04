import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('MessageService', () => {
  let service: MessageService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {

    matSnackBarSpy = jasmine.createSpyObj<MatSnackBar>(['open']);

    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ]
    });
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showSuccessMessage', () => {

    it('deve disparar mensagem de sucesso', () => {
      service.showSuccessMessage('mensagem de sucesso');

      expect(matSnackBarSpy.open).toHaveBeenCalledWith('mensagem de sucesso', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: ['success-message', 'fc-txt-center']
      });
    });
  });

  describe('showErrorMessage', () => {

    it('deve disparar mensagem de erro', () => {
      service.showErrorMessage('mensagem de erro');

      expect(matSnackBarSpy.open).toHaveBeenCalledWith('mensagem de erro', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: ['error-message', 'fc-txt-center']
      });
    });
  });
});
