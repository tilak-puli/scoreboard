import {
  getCurrentBowler,
  getInitialTypes,
  getStriker,
  getTeams,
} from './init-reducers';
import {getOver, getOverVal} from '../cricket-utils';
import {swapBatsman, swapTeams} from './actions-reducers';

function categorizeRuns(types, originalRuns) {
  let extras = 0;
  let runs = 0;
  if (types.wide || types.noBall) {
    extras++;
  }
  if (types.byes || types.legByes) {
    extras += originalRuns;
  } else {
    runs += originalRuns;
  }

  return {extras, runs};
}

export const addBall = (state, {payload}) => {
  const {battingTeam} = getTeams(state);

  if (state.selectedTypes.wicket && state.selectedRuns === null) {
    state.selectedRuns = payload.runs;
    state.wicketDialogVisible = true;
    return;
  }

  const runs = state.selectedRuns === null ? payload.runs : state.selectedRuns;

  if (state.needBowlerChange) {
    state.nextBowlerDialogVisible = true;
    return;
  }
  if (state.needInningsChange) {
    state.inningsOverDialogVisible = true;
    return;
  } else {
    updateBall(state, runs);
    state.selectedTypes = getInitialTypes();
    state.selectedRuns = null;
  }

  const allOversOver = state.overs.toFixed(1) == getOver(battingTeam.balls);
  const oneOverCompleted =
    battingTeam.balls % 6 === 0 && isBallCounted(state.selectedTypes);

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

export const updateSelectedType = (state, {payload}) => {
  state.selectedTypes = {...state.selectedTypes, [payload.type]: payload.value};
};

function updateBall(state, originalRuns) {
  const {battingTeam, bowlingTeam} = getTeams(state);
  const {bowling} = getCurrentBowler(bowlingTeam);
  const {batting} = getStriker(battingTeam);
  const types = state.selectedTypes;

  const {extras, runs} = categorizeRuns(types, originalRuns);

  updateBattingTeam(battingTeam, runs + extras, isBallCounted(types));
  updateStriker(batting, runs, types);
  updateBowler(bowling, runs + extras);

  if (state.selectedTypes.wicket) {
    batting.isOut = true;
    battingTeam.wickets++;
    bowling.wickets++;
  }
}

function updateBattingTeam(battingTeam, runs, isBallCounted) {
  battingTeam.runs += runs;
  if (isBallCounted) battingTeam.balls++;
}

function updateStriker(batting, runs) {
  batting.runs += runs;
  batting.balls += 1;
  batting.strikeRate = parseInt((batting.runs / batting.balls) * 100);
}

function updateBowler(bowling, runs) {
  bowling.runs += runs;
  bowling.balls += 1;
  bowling.economyRate = (bowling.runs / getOverVal(bowling.balls)).toFixed(2);
}

function isBallCounted({wide, noBall}) {
  if (wide || noBall) return false;

  return true;
}
