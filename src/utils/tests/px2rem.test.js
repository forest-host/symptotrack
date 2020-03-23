import px2rem from '../px2rem';

describe('px2rem', () => {
  it('should return 1rem with 16px', () => {
    const result = px2rem(16);
    expect(result).toBe('1rem');
  });

  it('should return 2 rem values with 2 values', () => {
    const result = px2rem(16, 16);
    expect(result).toBe('1rem 1rem');
  });

  it('should return 4 rem values with 4 values', () => {
    const result = px2rem(16, 16, 16, 16);
    expect(result).toBe('1rem 1rem 1rem 1rem');
  });
});
