import { describe, expect, it } from 'vitest';
import { rankMatches } from '@/lib/airportSearch';
import airports from '@/public/data/airports.json';

describe('rankMatches (Flying from / Flying to)', () => {
  it.each(['d', 'L', 'n'])('shows suggestions after a single character %j', (q) => {
    const result = rankMatches(airports, q);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].code.toLowerCase().startsWith(q.toLowerCase())).toBe(true);
  });

  it.each(['', '   '])('shows nothing for blank input %j', (q) => {
    expect(rankMatches(airports, q)).toEqual([]);
  });

  it('puts an exact airport code first', () => {
    expect(rankMatches(airports, 'del')[0].code).toBe('DEL');
  });

  it('finds airports by city name', () => {
    expect(rankMatches(airports, 'london').some((a) => a.code === 'LHR')).toBe(true);
  });

  it('returns at most 8 results and none for nonsense', () => {
    expect(rankMatches(airports, 'a')).toHaveLength(8);
    expect(rankMatches(airports, 'zzzzzzzz')).toEqual([]);
  });
});
