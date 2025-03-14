import { MovementDto } from './movement-dto';

describe('MovementDto', () => {
  it('should create an instance', () => {
    expect(new MovementDto('id', 'bank', 500, 'description', 'category', 'R$ 500,00')).toBeTruthy();
  });
});
