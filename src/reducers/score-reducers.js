import {getCurrentBowler, getStriker, getTeams} from './init-reducers';
import {getOver, getOverVal} from '../cricket-utils';
import {swapBatsman} from './actions-reducers';

export const addBall = (state, {payload}) => {
  const {battingTeam, bowlingTeam} = getTeams(state);
  const {bowling} = getCurrentBowler(bowlingTeam);
  const {batting} = getStriker(battingTeam);

  const allOversOver = state.overs == getOver(bowling.balls);
  const oneOverCompleted = (batting.balls + 1) % 6 === 0;

  if (oneOverCompleted) {
    state.nextBowlerDialogVisible = true;
  }

  if (allOversOver) {
    state.inning++;
    state.inningsOverDialogVisible = true;
    return;
  }

  //update batting team
  battingTeam.runs += payload.runs;
  battingTeam.balls++;

  //update striker
  batting.runs += payload.runs;
  batting.balls += 1;
  batting.strikeRate = parseInt((batting.runs / batting.balls) * 100);

  //update bowler
  bowling.runs += payload.runs;
  bowling.balls += 1;
  bowling.economyRate = (bowling.runs / getOverVal(bowling.balls)).toFixed(2);

  if (oneOverCompleted) {
    swapBatsman(battingTeam);
    state.nextBowlerDialogVisible = true;
  }

  if (allOversOver) {
    state.inning++;
    state.inningsOverDialogVisible = true;
  }
};
