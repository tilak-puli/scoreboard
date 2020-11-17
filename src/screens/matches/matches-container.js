import {connect} from 'react-redux';
import Matches from './matches';
import {matchesSlice} from '../../reducers/matches/reducer';
import {matchSlice} from '../../reducers/match/reducer';

const matchStateToProps = ({matches}) => ({
  matches: matches.data,
  loading: matches.loading,
});
const matchDispatchToProps = (dispatch) => ({
  updateMatches: (matches) =>
    dispatch(matchesSlice.actions.updateMatches({matches})),
  clearMatches: () => dispatch(matchesSlice.actions.clear()),
  setMatch: (match) => dispatch(matchSlice.actions.setMatch({match})),
  loadingMatches: (loading) =>
    dispatch(matchesSlice.actions.loadingMatches({loading})),
});

export default connect(matchStateToProps, matchDispatchToProps)(Matches);
