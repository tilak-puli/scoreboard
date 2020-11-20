import {connect} from 'react-redux';
import Stats from './stats';
import {matchesSlice} from '../../reducers/matches/reducer';

const matchStateToProps = ({matches}) => ({
  matches: matches.data,
  loading: matches.loading,
});

const matchDispatchToProps = (dispatch) => ({
  updateMatches: (matches) =>
    dispatch(matchesSlice.actions.updateMatches({matches})),
  clearMatches: () => dispatch(matchesSlice.actions.clear()),
  loadingMatches: (loading) =>
    dispatch(matchesSlice.actions.loadingMatches({loading})),
});

export default connect(matchStateToProps, matchDispatchToProps)(Stats);
