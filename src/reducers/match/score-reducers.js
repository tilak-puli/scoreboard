import {
  EXTRAS_TYPES,
  getCurrentBowler,
  getInitialTypes,
  getNonStriker,
  getPlayerOrNewPlayerIndex,
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
import {WICKET_TYPES} from '../../constants';

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

function addFieldingData(state) {
  if (!state.selectedTypes?.wicketHelper) {
    return;
  }

  const {battingTeam} = getTeams(state);
  const playerIndex = getPlayerOrNewPlayerIndex(
    battingTeam,
    state.selectedTypes.wicketHelper,
  );
  const fielder = battingTeam.players[playerIndex];
  switch (state.selectedTypes?.wicketType) {
    case WICKET_TYPES.STUMP_OUT:
      fielder.fielding.stumpings++;
      break;
    case WICKET_TYPES.RUN_OUT:
      fielder.fielding.runOuts++;
      break;
    case WICKET_TYPES.CATCH:
      fielder.fielding.catches++;
      break;
  }
}

function updateBall(state, originalRuns) {
  logState(state);

  const {battingTeam, bowlingTeam} = getTeams(state);
  const {bowling, name: bowlerName} = getCurrentBowler(bowlingTeam);
  const {batting, name} = getStriker(battingTeam);
  const {batting: NSbatting, name: NSName} = getNonStriker(battingTeam);
  const types = state.selectedTypes;

  const {extras, runs, extraType} = categorizeRuns(types, originalRuns);
  const ballCounted = isBallCounted(types);

  if (ballCounted) {
    state.validBalls++;
  }

  updateBattingTeam(battingTeam, runs, extras, extraType, ballCounted);
  battingTeam.runRate = getRunRate(
    battingTeam.runs,
    battingTeam.over.over,
    state.validBalls,
  );

  updateStriker(batting, runs, types, ballCounted);
  updateBowler(bowling, runs, types, state.validBalls);

  if (state.selectedTypes.wicket) {
    let outBatting = batting;
    let outBatter = name;

    if (state.selectedTypes.wicketType === WICKET_TYPES.RUN_OUT) {
      if (state.selectedTypes.outBatsman === NSName) {
        outBatting = NSbatting;
        outBatter = NSName;
      }
    } else {
      bowling.wickets++;
    }

    outBatting.isOut = true;
    outBatting.wicketCause = state.selectedTypes.wicketType;
    outBatting.wicketMessage = getOutMessage(
      state.selectedTypes.wicketType,
      state.selectedTypes.wicketHelper,
      bowlerName,
    );
    outBatting.wicketHelper = state.selectedTypes.wicketHelper;
    outBatting.wicketBowler = bowlerName;
    outBatting.isOut = true;
    outBatting.outBall = bowlingTeam.over.over + '.' + bowlingTeam.over.balls;
    battingTeam.wickets++;

    addFieldingData(state);

    battingTeam.fallOfWickets.push({
      name: outBatter,
      runs: battingTeam.runs,
      over: OverUtils.toString(battingTeam.over),
      bowler: bowlerName,
    });

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

function updateBattingTeam(battingTeam, runs, extras, extrasType, ballCounted) {
  battingTeam.runs += runs + extras;

  if (ballCounted) {
    battingTeam.over = OverUtils.addBall(battingTeam.over);
  }

  if (extras) {
    battingTeam.extras[extrasType] += extras;
  }
}

function updateStriker(batting, runs, types, ballCounted) {
  if (runs === 4) {
    batting.fours++;
  }
  if (runs === 6) {
    batting.sixers++;
  }

  if (!types.wide) {
    batting.runs += runs;
  }

  if (ballCounted) {
    batting.balls += 1;
  }

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
  return !(wide || noBall);
}

function logState(state) {
  if (state.prevStates.length >= 10) {
    state.prevStates.shift();
  }
  const {prevStates, ...rest} = current(state);
  state.prevStates.push(rest);
}

function chasedMessage(name, runs, overs) {
  return name + ' chased down ' + runs + ' runs in ' + overs + ' overs.';
}

function defendedMessage(name, runsNeeded) {
  if (runsNeeded < 5) {
    return `Tight match!! ${name} won by just ${runsNeeded} runs`;
  }
  return name + ' won by ' + runsNeeded + ' runs.';
}

function drawMessage() {
  return "Oh Wow, It's a draw. Time for super over now.!!";
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
      bowlingTeam.runs - battingTeam.runs,
    );
  } else {
    state.matchWonBy = null;
    state.matchOverMessage = drawMessage();
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
