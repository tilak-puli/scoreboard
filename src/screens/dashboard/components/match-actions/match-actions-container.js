import {connect} from 'react-redux';
import MatchActions from './match-actions';
import {matchSlice} from '../../../../reducer';

const mapDispatchToProps = (dispatch) => ({
  endInnings: () => dispatch(matchSlice.actions.endInnings()),
});

export default connect(null, mapDispatchToProps)(MatchActions);
