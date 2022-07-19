import {connect} from 'react-redux';
import Scoreboard from './scoreboard';
import {matchesSlice} from '../../reducers/matches/reducer';

const matchStateToProps = ({match}) => ({
  match,
});

const matchDispatchToProps = (dispatch) => ({
  updateMatches: (matches) =>
    dispatch(matchesSlice.actions.updateMatches({matches})),
});

export default connect(matchStateToProps, matchDispatchToProps)(Scoreboard);
