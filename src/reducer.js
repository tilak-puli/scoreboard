import {createSlice} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

const initBatsman = (name) => ({
  name,
  runs: 0,
  balls: 0,
  fours: 0,
  sixers: 0,
  strikeRate: 0,
});

const initBowler = (name) => ({
  name,
  overs: 0,
  maidens: 0,
  runs: 0,
  wickets: 0,
  economyRate: 0,
});

const teamInitialState = (name) => ({
  name,
  runs: 0,
  wickets: 0,
  overs: 0,
  batsPersons: [initBatsman('striker'), initBatsman('non striker')],
  bowlers: [initBowler('bowler')],
  strikerIndex: 0,
  nonStrikerIndex: 1,
  bowlerIndex: 0,
});

const initialState = {
  team1: teamInitialState('team1'),
  team2: teamInitialState('team2'),
  overs: 0,
};

const updateMatchBasicDetails = (state, {payload}) => {
  state.team1.name = payload.team1Name;
  state.team2.name = payload.team2Name;
  state.overs = payload.overs;
  state.tossWonByTeam = payload.tossWonByTeam;
  state.selected = payload.selected;
  state.battingTeam = payload.selected === 'batting' ? 'team1' : 'team2';
  state.bowlingTeam = payload.selected === 'batting' ? 'team2' : 'team1';
};

const updateInitPlayers = (state, {payload}) => {
  const {striker, nonStriker, bowler} = payload;
  const battingTeam = state[state.battingTeam];
  const bowlerTeam = state[state.bowlingTeam];

  battingTeam.batsPersons[battingTeam.strikerIndex].name = striker;
  battingTeam.batsPersons[battingTeam.nonStrikerIndex].name = nonStriker;
  bowlerTeam.bowlers[battingTeam.bowlerIndex].name = bowler;
};

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    updateMatchBasicDetails,
    updateInitPlayers,
  },
});

export default combineReducers({
  match: matchSlice.reducer,
});
