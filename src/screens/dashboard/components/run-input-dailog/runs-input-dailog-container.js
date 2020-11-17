import {connect} from 'react-redux';
import RunsInputDialog from './runs-input-dailog';
import {matchSlice} from '../../../../reducers/match/reducer';

const mapStateToProps = ({match}) => ({
  isVisible: match.runsInputDialogVisible,
});

const mapDispatchToProps = (dispatch) => ({
  hide: () =>
    dispatch(matchSlice.actions.updateRunsInputDialogVisible({visible: false})),
  addRuns: (runs) => dispatch(matchSlice.actions.addBall({runs})),
});

export default connect(mapStateToProps, mapDispatchToProps)(RunsInputDialog);
