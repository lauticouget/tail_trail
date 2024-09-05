import Regex from './regex.util';

describe('Properly formatted email', () => {
  it('Should test positive', () => {
    const aProperEmail = 'test@test.com';
    const result = Regex.email.test(aProperEmail);
    expect(result).toBe(true);
  });
});

describe('Not properly formatted email', () => {
  it('Should test negative', () => {
    const notAProperEmail = 'test@test.';
    const result = Regex.email.test(notAProperEmail);
    expect(result).toBe(false);
  });
});
