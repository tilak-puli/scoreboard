import {createSlice} from '@reduxjs/toolkit';

const updateMatches = (state, {payload}) => {
  state.data = payload.matches;
  state.loading = false;
};
const loadingMatches = (state, {payload}) => {
  state.loading = payload.loading;
};
const clear = () => [];

export const matchesSlice = createSlice({
  name: 'matches',
  initialState: {data: [], loading: false},
  reducers: {updateMatches, loadingMatches, clear},
});
