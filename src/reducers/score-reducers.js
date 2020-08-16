import {getCurrentBowler, getStriker, getTeams} from './init-reducers';
import {getOver, getOverVal} from '../cricket-utils';
import {swapBatsman, swapTeams} from './actions-reducers';

export const addBall = (state, {payload}) => {
  const {battingTeam, bowlingTeam} = getTeams(state);
  const {bowling} = getCurrentBowler(bowlingTeam);
  const {batting} = getStriker(battingTeam);

  if (state.needBowlerChange) state.nextBowlerDialogVisible = true;
  if (state.needInningsChange) state.inningsOverDialogVisible = true;
  else {
    updateBall(battingTeam, payload, batting, bowling);
  }

  const allOversOver = state.overs.toFixed(1) == getOver(battingTeam.balls);
  const oneOverCompleted = batting.balls % 6 === 0;

  if (allOversOver) {
    state.inningsOverDialogVisible = true;
    state.needInningsChange = true;
    state.innings++;
    swapTeams(state);
  } else if (oneOverCompleted) {
    swapBatsman(battingTeam);
    state.nextBowlerDialogVisible = true;
    state.needBowlerChange = true;
  }
};

function updateBall(battingTeam, payload, batting, bowling) {
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
}
