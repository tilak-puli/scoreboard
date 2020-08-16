import {getStriker, getTeams} from './init-reducers';
import {isAllOut} from './match-reducers';

export const undo = () => {};

export const swap = (state) => {
  const {battingTeam} = getTeams(state);
  swapBatsman(battingTeam);
};

export const retire = (state) => {
  const {battingTeam} = getTeams(state);
  const striker = getStriker(battingTeam);

  battingTeam.retiredCounts++;
  striker.isRetired = true;

  if (isAllOut(battingTeam)) {
    state.inning++;
    state.inningsOverDialogVisible = true;
    return;
  }

  state.nextBatsmanDialogVisible = true;
};

export const swapBatsman = (battingTeam) => {
  const oldStrikerIndex = battingTeam.strikerIndex;
  battingTeam.strikerIndex = battingTeam.nonStrikerIndex;
  battingTeam.nonStrikerIndex = oldStrikerIndex;
};
