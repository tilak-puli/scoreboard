import {createSlice} from '@reduxjs/toolkit';
import {
  createNewMatch,
  endInnings,
  nextBatsman,
  nextBowler,
  setMatch,
} from './match-reducers';
import {
  getInitialTypes,
  teamInitialState,
  updateInitPlayers,
  updateMatchBasicDetails,
} from './init-reducers';
import {addBall, updateSelectedType} from './score-reducers';
import {retire, swap, undo} from './actions-reducers';
import {
  updateInitPlayersDialogVisible,
  updateInningsOverDialogVisible,
  updateMatchOverDialogVisible,
  updateNextBatsmanDialogVisible,
  updateNextBowlerDialogVisible,
  updateRunsInputDialogVisible,
  updateWicketDialogVisible,
} from './dialog-reducers';

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

export const matchSlice = createSlice({
  name: 'match',
  initialState: getInitialState(),
  reducers: {
    createNewMatch,
    updateMatchBasicDetails,
    updateInitPlayers,

    addBall,
    updateSelectedType,

    undo,
    swap,
    retire,

    nextBatsman,
    nextBowler,

    endInnings,

    setMatch,

    updateWicketDialogVisible,
    updateMatchOverDialogVisible,
    updateRunsInputDialogVisible,
    updateNextBatsmanDialogVisible,
    updateNextBowlerDialogVisible,
    updateInitPlayersDialogVisible,
    updateInningsOverDialogVisible,
  },
});
