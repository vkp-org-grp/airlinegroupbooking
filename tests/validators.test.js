import { describe, expect, it } from 'vitest';
import { isValidEmail, isValidPassengerCount, MIN_PASSENGERS } from '@/lib/validators';

describe('isValidEmail', () => {
  it.each(['john@gmail.com', 'first.last@company.co.in', '  spaced@example.org  '])('accepts %j', (v) => {
    expect(isValidEmail(v)).toBe(true);
  });
  it.each(['', 'john', 'john@', '@gmail.com', 'john..doe@gmail.com', '.john@gmail.com', 'jo#hn@gmail.com', 'john@gmail.invalidtld'])(
    'rejects %j',
    (v) => {
      expect(isValidEmail(v)).toBe(false);
    }
  );
});

describe('isValidPassengerCount', () => {
  it('accepts whole numbers from the minimum upwards', () => {
    expect(isValidPassengerCount(MIN_PASSENGERS)).toBe(true);
    expect(isValidPassengerCount(String(MIN_PASSENGERS + 40))).toBe(true);
  });
  it.each([MIN_PASSENGERS - 1, 0, -10, 10.5, 'abc', '', undefined])('rejects %j', (v) => {
    expect(isValidPassengerCount(v)).toBe(false);
  });
});
