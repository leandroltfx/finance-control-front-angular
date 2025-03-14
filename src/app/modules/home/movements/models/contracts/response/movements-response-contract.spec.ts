import { MovementResponse, MovementsResponseContract } from './movements-response-contract';

describe('MovementsResponseContract', () => {
  it('should create an instance', () => {
    const movementResponse: MovementResponse = new MovementResponse('id', 'bank', 100, 'description', 'category');
    expect(new MovementsResponseContract([movementResponse])).toBeTruthy();
  });
});
