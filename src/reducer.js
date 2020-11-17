import {combineReducers} from 'redux';
import {matchSlice} from './reducers/match/reducer';
import {matchesSlice} from './reducers/matches/reducer';

export default combineReducers({
  match: matchSlice.reducer,
  matches: matchesSlice.reducer,
});
