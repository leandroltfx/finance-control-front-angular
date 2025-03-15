import { Injectable } from '@angular/core';

import { LtfUtilsService } from 'ltf-utils';

import { MovementDto } from '../../models/dto/movement-dto';
import { MovementsRequestContract } from '../../models/contracts/request/movements-request-contract';
import { MovementsResponseContract } from '../../models/contracts/response/movements-response-contract';

@Injectable()
export class MovementsAdapterService {

  constructor(
    private readonly _ltfUtilsService: LtfUtilsService,
  ) { }

  public toDto(
    movementsResponseContract: MovementsResponseContract
  ): MovementDto[] {

    const movementsDto: MovementDto[] = [];

    for (const movementResponse of movementsResponseContract.movements) {
      const movementDto: MovementDto = new MovementDto(
        movementResponse.id,
        movementResponse.registerDate,
        movementResponse.bankAccount,
        movementResponse.value,
        movementResponse.description,
        movementResponse.category,
        this._ltfUtilsService.formatCurrencyBrl(movementResponse.value),
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
}
