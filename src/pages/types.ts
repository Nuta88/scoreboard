import { v4 as uuidv4 } from 'uuid';

export interface IMatch {
  id: string;
  homeTeamName: string;
  homeTeamPoints: number;
  awayTeamPoints: number;
  awayTeamName: string;
  startTime: number;
}

export class Match implements IMatch {
  id: string;
  homeTeamPoints: number;
  awayTeamPoints: number;
  homeTeamName: string;
  awayTeamName: string;
  startTime: number;
  
  constructor (
    homeTeamName: string,
    awayTeamName: string,
    homeTeamPoints: number = 0,
    awayTeamPoints: number = 0
  ) {
    this.id = uuidv4();
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.homeTeamPoints = homeTeamPoints;
    this.awayTeamPoints = awayTeamPoints;
    this.startTime = new Date().getTime();
  }
}