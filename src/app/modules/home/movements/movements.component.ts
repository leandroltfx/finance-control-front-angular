import { Component } from '@angular/core';

import { MovementDto } from './models/dto/movement-dto';
import { MovementsService } from './acl/service/movements.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'fc-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent {

  public movementsDto: MovementDto[] = []

  constructor(
    private readonly _authService: AuthService,
    private readonly _movementsService: MovementsService,
  ) { }

  public ngOnInit(): void {
    this._getMovements();
  }

  private _getMovements(): void {
    this._movementsService.getMovements(
      this._authService.loggedUser?.id
    ).subscribe(
      {
        next: (movementsDto: MovementDto[]) => this.movementsDto = movementsDto,
        error: (httpErrorResponse: HttpErrorResponse) => console.log(httpErrorResponse),
      }
    );
  }
}
