import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import {st_deleteMatch} from '../match/storage-reducers';

const updateMatches = (state, {payload}) => {
  state.data = payload.matches;
  state.loading = false;
};
const loadingMatches = (state, {payload}) => {
  state.loading = payload.loading;
};
const clear = () => ({data: [], loading: false});

const deleteMatch = (state, {payload}) => {
  _.remove(state.data, (match) => match.createdTime === payload.createdTime);
  st_deleteMatch(payload.createdTime);
};

export const matchesSlice = createSlice({
  name: 'matches',
  initialState: {data: [], loading: false},
  reducers: {updateMatches, deleteMatch, loadingMatches, clear},
});
