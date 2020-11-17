import {connect} from 'react-redux';
import Actions from './actions';
import {matchSlice} from '../../../../reducers/match/reducer';

const mapDispatchToProps = (dispatch) => ({
  undo: () => dispatch(matchSlice.actions.undo()),
  retire: () => dispatch(matchSlice.actions.retire()),
  swap: () => dispatch(matchSlice.actions.swap()),
});
export default connect(null, mapDispatchToProps)(Actions);
