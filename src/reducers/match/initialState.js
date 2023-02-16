import {getInitialTypes, teamInitialState} from './init-reducers';

export const getInitialState = () => ({
  team1: teamInitialState('team1'),
  team2: teamInitialState('team2'),
  battingTeam: 'team1',
  bowlingTeam: 'team2',

  overs: 0,
  innings: 1,

  validBalls: 0,

  selectedTypes: getInitialTypes(),
  selectedRuns: null,

  matchOver: false,
  matchOverMessage: '',
  matchWonBy: '',

  prevStates: [],

  matchOverDialogVisible: false,
  wicketDialogVisible: false,
  runsInputDialogVisible: false,
  NextPlayerDialogVisible: false,
  inningsOverDialogVisible: false,
  initPlayersDialogVisible: false,

  needBowlerChange: false,
});
