import {
  getCurrentBowler,
  getInitialTypes,
  getStriker,
  getTeams,
} from './init-reducers';
import {getOver, getOverVal} from '../cricket-utils';
import {swapBatsman, swapTeams} from './actions-reducers';
import {current} from '@reduxjs/toolkit';

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
  const runs = state.selectedRuns === null ? payload.runs : state.selectedRuns;

  if (state.needBowlerChange) {
    state.nextBowlerDialogVisible = true;
    return;
  } else if (state.needInningsChange) {
    state.inningsOverDialogVisible = true;
    return;
  } else if (state.matchOver) {
    state.matchOverDialogVisible = true;
    return;
  } else if (state.selectedTypes.wicket && !state.selectedTypes.wicketType) {
    state.selectedRuns = payload.runs;
    state.wicketDialogVisible = true;
    return;
  } else {
    updateBall(state, runs);
    state.selectedTypes = getInitialTypes();
    state.selectedRuns = null;
  }

  finalize(state);
};

export const updateSelectedType = (state, {payload}) => {
  state.selectedTypes = {...state.selectedTypes, [payload.type]: payload.value};
};

const logBall = (battingTeam, runs, extras, types) => {
  battingTeam.ballsLog.push({runs, extras, types});
};

function updateBall(state, originalRuns) {
  logState(state);

  const {battingTeam, bowlingTeam} = getTeams(state);
  const {bowling} = getCurrentBowler(bowlingTeam);
  const {batting} = getStriker(battingTeam);
  const types = state.selectedTypes;

  const {extras, runs} = categorizeRuns(types, originalRuns);
  const ballCounted = isBallCounted(types);

  if (ballCounted) {
    state.validBalls++;
  }

  updateBattingTeam(battingTeam, runs + extras, ballCounted);
  updateStriker(batting, runs, types);
  updateBowler(bowling, runs + extras);

  if (state.selectedTypes.wicket) {
    batting.isOut = true;
    battingTeam.wickets++;
    bowling.wickets++;
    state.wicketDialogVisible = true;
  }
  logBall(battingTeam, runs, extras, state.selectedTypes);
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

function logState(state) {
  if (state.prevStates.length >= 10) state.prevStates.shift();
  const {prevStates, ...rest} = current(state);
  state.prevStates.push(rest);
}

function handleMatchOver(state) {
  const {battingTeam, bowlingTeam} = getTeams(state);

  if (battingTeam.runs > bowlingTeam.runs) {
    state.matchWonBy = state.battingTeam;
  } else if (battingTeam.runs < bowlingTeam.runs) {
    state.matchWonBy = state.bowlingTeam;
  }

  state.matchOver = true;
  state.matchOverDialogVisible = true;
}

function finalize(state) {
  const {battingTeam, bowlingTeam} = getTeams(state);

  const allOversOver = state.overs.toFixed(1) == getOver(battingTeam.balls);
  const oneOverCompleted = state.validBalls >= 6;
  let chased = state.innings === 2 && battingTeam.runs > bowlingTeam.runs;

  if (chased) {
    handleMatchOver(state);
  } else if (allOversOver) {
    if (state.innings === 2) {
      handleMatchOver(state);
    } else {
      state.inningsOverDialogVisible = true;
      state.needInningsChange = true;
      state.innings++;
      state.validBalls = 0;
      swapTeams(state);
    }
  } else if (oneOverCompleted) {
    swapBatsman(battingTeam);
    state.nextBowlerDialogVisible = true;
    state.needBowlerChange = true;
    state.validBalls = 0;
  }
}
