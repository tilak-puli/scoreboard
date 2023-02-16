import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import {st_deleteMatch} from '../match/storage-reducers';

const initialState = {data: [], loading: false, players: {}};

const updateMatches = (state, {payload}) => {
  state.data = payload.matches;
  state.loading = false;

  payload.matches?.forEach(match => {
    match?.team1?.players?.forEach(player => {
      state.players[player.name] = {};
    });
  });
};

const loadingMatches = (state, {payload}) => {
  state.loading = payload.loading;
};
const clear = () => initialState;

const deleteMatch = (state, {payload}) => {
  _.remove(state.data, match => match.createdTime === payload.createdTime);
  st_deleteMatch(payload.createdTime);
};

export const addGlobalPlayer = (state, {payload}) => {
  state.players[payload.name] = {};
};

export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    updateMatches,
    deleteMatch,
    loadingMatches,
    clear,
    addGlobalPlayer,
  },
});
