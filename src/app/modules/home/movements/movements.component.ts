import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MovementDto } from './models/dto/movement-dto';
import { Message } from '../../../shared/enum/message.enum';
import { MovementsService } from './acl/service/movements.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'fc-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent {

  public movementsDto: MovementDto[] = [];
  public displayedColumns: string[] = ['registerDate', 'bankAccount', 'category', 'description', 'formattedBalance'];
  public errorMessage!: string;

  constructor(
    private readonly _authService: AuthService,
    private readonly _movementsService: MovementsService,
  ) { }

  public ngOnInit(): void {
    this.getMovements();
  }

  public getMovements(): void {
    this._movementsService.getMovements(
      this._authService.loggedUser?.id
    ).subscribe(
      {
        next: (movementsDto: MovementDto[]) => {
          this.movementsDto = movementsDto;
          this.errorMessage = '';
        },
        error: (httpErrorResponse: HttpErrorResponse) => this.errorMessage = httpErrorResponse.error['message'] ?? Message.DEFAULT_HTTP_ERROR_MESSAGE,
      }
    );
  }
}
