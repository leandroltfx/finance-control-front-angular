import { Injectable } from '@angular/core';
import { formatCurrency, formatDate } from '@angular/common';

import { MovementDto } from '../../models/dto/movement-dto';
import { MovementsRequestContract } from '../../models/contracts/request/movements-request-contract';
import { MovementsResponseContract } from '../../models/contracts/response/movements-response-contract';

@Injectable()
export class MovementsAdapterService {

  constructor() { }

  public toDto(
    movementsResponseContract: MovementsResponseContract
  ): MovementDto[] {

    const movementsDto: MovementDto[] = [];

    for (const movementResponse of movementsResponseContract.movements) {
      const movementDto: MovementDto = new MovementDto(
        movementResponse.id,
        formatDate(this._dateStringToDate(movementResponse.registerDate), 'dd/MM/yyyy', 'pt-BR'),
        movementResponse.bankAccount,
        movementResponse.value,
        movementResponse.description,
        movementResponse.category,
        formatCurrency(movementResponse.value, 'pt-BR', 'R$')
      );
      movementsDto.push(movementDto);
    }

    return movementsDto;
  }

  public toRequestContract(
    userId: string
  ): MovementsRequestContract {
    return new MovementsRequestContract(userId);
  }

  private _dateStringToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
}
