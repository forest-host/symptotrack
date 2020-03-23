import hex2rgba from '../hex2rgba';

describe('hex2rgba', () => {
  it('should return correct hex value', () => {
    const result = hex2rgba('#FFFFFF');
    expect(result).toBe('rgba(255,255,255,undefined)');
  });

  it('should return correct hex value with opacity', () => {
    const result = hex2rgba('#FFFFFF', 0.5);
    expect(result).toBe('rgba(255,255,255,0.5)');
  });
});
