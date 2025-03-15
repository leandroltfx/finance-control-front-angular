import { MovementDto } from './movement-dto';

describe('MovementDto', () => {
  it('should create an instance', () => {
    expect(new MovementDto('id', '01.01.2021', 'bank', 500, 'description', 'category', 'R$ 500,00')).toBeTruthy();
  });
});
