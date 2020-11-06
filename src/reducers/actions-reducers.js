import {getStriker, getTeams} from './init-reducers';

export const undo = (state) => {
  if (state.prevStates.length) {
    return {
      ...state.prevStates[state.prevStates.length - 1],
      prevStates: state.prevStates.slice(0, state.prevStates.length - 1),
    };
  }
};

export const swap = (state) => {
  const {battingTeam} = getTeams(state);
  swapBatsman(battingTeam);
};

export const retire = (state) => {
  const {battingTeam} = getTeams(state);
  const striker = getStriker(battingTeam);

  battingTeam.retiredCounts++;
  striker.isRetired = true;
  state.nextBatsmanDialogVisible = true;
};

export const swapBatsman = (battingTeam) => {
  const oldStrikerIndex = battingTeam.strikerIndex;
  battingTeam.strikerIndex = battingTeam.nonStrikerIndex;
  battingTeam.nonStrikerIndex = oldStrikerIndex;
};

export const swapTeams = (state) => {
  const oldBattingTeam = state.battingTeam;
  state.battingTeam = state.bowlingTeam;
  state.bowlingTeam = oldBattingTeam;
};
