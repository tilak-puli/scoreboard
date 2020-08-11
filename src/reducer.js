import {createSlice} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

const initialState = {
  team1: {},
  team2: {},
};

const updateTeamNames = (state, action) => {
  state.team1.name = action.payload.team1Name;
  state.team2.name = action.payload.team2Name;
};

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    updateTeamNames,
  },
});

export default combineReducers({
  match: matchSlice.reducer,
});
