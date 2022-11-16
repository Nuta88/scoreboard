import { IMatch } from '../../../types';

export const calculateTotalScore = (match: IMatch) => match.homeTeamPoints + match.awayTeamPoints;

export const scoreTimeMatchComparator = (matchA: IMatch, matchB: IMatch) =>
  (calculateTotalScore(matchB) - calculateTotalScore(matchA)) || (matchB.startTime - matchA.startTime);

export const sortMatches = (matches: IMatch[]) => matches.sort(scoreTimeMatchComparator);