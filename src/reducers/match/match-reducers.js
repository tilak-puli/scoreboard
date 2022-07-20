import {
  getNonStriker,
  getPlayerOrNewPlayerIndex,
  getStriker,
  getTeams,
} from './init-reducers';
import {handleInningsChange, handleMatchOver} from './score-reducers';
import {getInitialState} from './reducer';

export const createNewMatch = () => getInitialState();

//handle out player name coming again
export const nextBatsman = (state, {payload}) => {
  const {battingTeam} = getTeams(state);
  let nextBatsmanPlayer = getPlayerOrNewPlayerIndex(battingTeam, payload.name);

  if (getNonStriker(battingTeam)?.batting?.isOut) {
    battingTeam.nonStrikerIndex = nextBatsmanPlayer;
  } else {
    battingTeam.strikerIndex = nextBatsmanPlayer;
  }

  battingTeam.players[battingTeam.strikerIndex].batting.positions[
    state.innings - 1
  ] = battingTeam.wickets + battingTeam.retiredCounts + 1;

  state.nextBatsmanDialogVisible = false;
};

export const nextBowler = (state, {payload}) => {
  const bowlingTeam = getTeams(state).bowlingTeam;
  bowlingTeam.bowlerIndex = getPlayerOrNewPlayerIndex(
    bowlingTeam,
    payload.name,
  );
  state.nextBowlerDialogVisible = false;
  state.needBowlerChange = false;
};

export const endInnings = state => {
  if (state.innings === 2) {
    return handleMatchOver(state);
  }
  handleInningsChange(state);
};

export const setMatch = (state, {payload}) => ({
  prevStates: [],
  ...payload.match,
});

export const isAllOut = team => team.retiredCounts + team.wickets === 10;
