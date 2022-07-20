import {
  EXTRAS_TYPES,
  getCurrentBowler,
  getInitialTypes,
  getNonStriker,
  getStriker,
  getTeams,
} from './init-reducers';
import {getOverVal} from '../../cricket-utils';
import {swapBatsman, swapTeams} from './actions-reducers';
import {current} from '@reduxjs/toolkit';
import {endInnings} from './match-reducers';
import {st_mergeMatch} from './storage-reducers';
import {OverUtils} from '../../models/OverUtils';
import {getOutMessage} from '../../screens/scoreboard/scoreboard';

function categorizeRuns(types, originalRuns) {
  let extras = 0;
  let runs = 0;
  let extraType = null;

  if (types.wide || types.noBall) {
    extras++;
    extraType = types.wide ? EXTRAS_TYPES.wide : EXTRAS_TYPES.noBall;
  }
  if (types.byes || types.legByes) {
    extras += originalRuns;
    extraType = EXTRAS_TYPES.byes;
  } else {
    runs += originalRuns;
  }

  return {extras, runs, extraType};
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

  finalize(state, runs);
  st_mergeMatch(state);
};

export const updateSelectedType = (state, {payload}) => {
  state.selectedTypes = {...state.selectedTypes, [payload.type]: payload.value};
};

const logBall = (
  battingTeam,
  runs,
  extras,
  types,
  batsmen = [],
  bowler,
  over,
) => {
  battingTeam.ballsLog.push({runs, extras, types, batsmen, bowler, over});
};

export function getRunRate(runs, over, validBalls) {
  return (runs / (over + validBalls / 6 || 1)).toFixed(2) || 0.0;
}

function updateBall(state, originalRuns) {
  logState(state);

  const {battingTeam, bowlingTeam} = getTeams(state);
  const {bowling, name: bowlerName} = getCurrentBowler(bowlingTeam);
  const {batting, name} = getStriker(battingTeam);
  const {name: NSName} = getNonStriker(battingTeam);
  const types = state.selectedTypes;

  const {extras, runs, extraType} = categorizeRuns(types, originalRuns);
  const ballCounted = isBallCounted(types);

  if (ballCounted) {
    state.validBalls++;
  }

  updateBattingTeam(battingTeam, runs, extras, extraType);
  battingTeam.runRate = getRunRate(
    battingTeam.runs,
    battingTeam.over.over,
    state.validBalls,
  );

  updateStriker(batting, runs, types);
  updateBowler(bowling, runs, types, state.validBalls);

  if (state.selectedTypes.wicket) {
    batting.isOut = true;
    batting.wicketCause = state.selectedTypes.wicketType;
    batting.wicketMessage = getOutMessage(state.selectedTypes.wicketType);
    batting.wicketHelper = state.selectedTypes.wicketHelper;
    batting.wicketBowler = bowlerName;
    batting.isOut = true;
    batting.outBall = bowlingTeam.over.over + '.' + bowlingTeam.over.balls;
    battingTeam.wickets++;
    bowling.wickets++;
    state.wicketDialogVisible = true;
  }
  logBall(
    battingTeam,
    runs,
    extras,
    state.selectedTypes,
    [name, NSName],
    bowlerName,
    battingTeam.over,
  );
}

function updateBattingTeam(battingTeam, runs, extras, extrasType) {
  battingTeam.runs += runs + extras;
  battingTeam.over = OverUtils.addBall(battingTeam.over);

  if (extras) {
    battingTeam.extras[extrasType] += extras;
  }
}

function updateStriker(batting, runs) {
  if (runs === 4) batting.fours++;
  if (runs === 6) batting.sixers++;

  batting.runs += runs;
  batting.balls += 1;
  batting.strikeRate = parseInt((batting.runs / batting.balls) * 100);
}

function updateBowler(bowling, runs, types, validBalls) {
  bowling.runs += runs;
  if (types.wide || types.noBall) {
    bowling.runs++;
  }
  bowling.over = OverUtils.addBall(bowling.over);
  bowling.economyRate = (
    bowling.runs / getOverVal(validBalls + bowling.over.over * 6)
  ).toFixed(2);

  bowling.currentOverRuns += runs;
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

function chasedMessage(name, runs, overs) {
  return name + ' chased down ' + runs + ' in ' + overs + ' overs';
}

function defendedMessage(name, runs) {
  return name + ' successfully defended ' + runs;
}

export function handleMatchOver(state) {
  const {battingTeam, bowlingTeam} = getTeams(state);

  if (battingTeam.runs > bowlingTeam.runs) {
    state.matchWonBy = battingTeam.name;
    state.matchOverMessage = chasedMessage(
      battingTeam.name,
      bowlingTeam.runs,
      OverUtils.toString(battingTeam.over),
    );
  } else if (battingTeam.runs < bowlingTeam.runs) {
    state.matchWonBy = bowlingTeam.name;
    state.matchOverMessage = defendedMessage(
      bowlingTeam.name,
      bowlingTeam.runs,
    );
  }

  state.matchOver = true;
  state.matchOverDialogVisible = true;
}

export function handleInningsChange(state) {
  state.inningsOverDialogVisible = true;
  state.needInningsChange = true;
  state.needBowlerChange = false;
  state.innings++;
  state.validBalls = 0;
  swapTeams(state);
}

function handleOverChange(state) {
  const {battingTeam, bowlingTeam} = getTeams(state);
  let {bowling} = getCurrentBowler(bowlingTeam);

  if (bowling.currentOverRuns === 0) {
    bowling.maidens++;
  }
  swapBatsman(battingTeam);

  bowling.over = OverUtils.nextOver(bowling.over);
  battingTeam.over = OverUtils.nextOver(battingTeam.over);
  state.validBalls = 0;
  bowling.currentOverRuns = 0;
}

function finalize(state, runs) {
  const {battingTeam, bowlingTeam} = getTeams(state);

  const oneOverCompleted = state.validBalls >= 6;
  const allOversOver =
    state.overs === battingTeam.over.over + (oneOverCompleted ? 1 : 0);
  let chased = state.innings === 2 && battingTeam.runs > bowlingTeam.runs;

  if (needBatsmenSwap(runs)) {
    swapBatsman(battingTeam);
  }
  if (oneOverCompleted) {
    handleOverChange(state);
  }

  if (chased) {
    handleMatchOver(state);
  } else if (allOversOver) {
    endInnings(state);
  } else if (oneOverCompleted) {
    state.nextBowlerDialogVisible = true;
    state.needBowlerChange = true;
  }
}

const needBatsmenSwap = runs => runs % 2 !== 0;
