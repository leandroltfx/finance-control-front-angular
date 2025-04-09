import { MovementsRequestContract } from './movements-request-contract';

describe('MovementsRequestContract', () => {
  it('should create an instance', () => {
    expect(new MovementsRequestContract('userId')).toBeTruthy();
  });
});
