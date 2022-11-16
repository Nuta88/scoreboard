import { calculateTotalScore, scoreTimeMatchComparator, sortMatches } from './utils';

import { Match } from '../../../types';

describe("Utils test", () => {
  const match1 = new Match('Canada', 'Mexico', 2, 5);
  const match2 = new Match('Spain', 'Brazil', 2, 10);
  
  
  test('should calculate total match score', () => {
    expect(calculateTotalScore(match1)).toEqual(7);
  });
  
  test('should compare matches', () => {
    const result = 5;
    
    expect(scoreTimeMatchComparator(match1, match2)).toEqual(result);
  });
  
  test('should sort matches', () => {
    const result = [match2, match1];
    
    expect(sortMatches([match1, match2])).toEqual(result);
  });
});
