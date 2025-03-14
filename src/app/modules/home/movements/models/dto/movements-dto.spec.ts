import { MovementsDto } from './movements-dto';

describe('MovementsDto', () => {
  it('should create an instance', () => {
    expect(new MovementsDto('id', 'bank', 500, 'description', 'category')).toBeTruthy();
  });
});
