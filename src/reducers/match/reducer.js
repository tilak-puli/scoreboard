import {createSlice} from '@reduxjs/toolkit';
import {
  createNewMatch,
  endInnings,
  nextBatsman,
  nextBowler,
  setMatch,
} from './match-reducers';
import {updateInitPlayers, updateMatchBasicDetails} from './init-reducers';
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
import {getInitialState} from './initialState';

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
