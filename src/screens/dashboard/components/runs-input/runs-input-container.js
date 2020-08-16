import {connect} from 'react-redux';
import RunsInput from './runs-input';
import {matchSlice} from '../../../../reducer';

const mapDispatchToProps = (dispatch) => ({
  showRunsDialog: () =>
    dispatch(matchSlice.actions.updateRunsInputDialogVisible({visible: true})),
  addBall: (runs) => dispatch(matchSlice.actions.addBall({runs})),
});

export default connect(null, mapDispatchToProps)(RunsInput);
