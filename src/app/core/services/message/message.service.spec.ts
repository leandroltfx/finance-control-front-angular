import { TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CoreModule } from '../../core.module';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {

    matSnackBarSpy = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [
        CoreModule,
      ],
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

  describe('showMessage', () => {
    it('deve disparar uma mensagem em tela', () => {

      service.showMessage('message', 'success');

      expect(matSnackBarSpy.open).toHaveBeenCalledWith(
        'message',
        '',
        {
          duration: service['_durationMessage'],
          horizontalPosition: service['_horizontalPositionMessage'],
          verticalPosition: service['_verticalPositionMessage'],
          panelClass: 'success-message',
        }
      );
    });
  });
});
