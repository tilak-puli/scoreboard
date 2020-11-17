import {connect} from 'react-redux';
import WicketDialog from './wicket-dialog';
import {matchSlice} from '../../../../reducers/match/reducer';

const mapStateToProps = ({match}) => ({
  isVisible: match.wicketDialogVisible,
});

const mapDispatchToProps = (dispatch) => ({
  addBall: () => dispatch(matchSlice.actions.addBall()),
  nextBatsman: (name) => dispatch(matchSlice.actions.nextBatsman({name})),
  cancel: () =>
    dispatch(matchSlice.actions.updateWicketDialogVisible({visible: false})),
  updateSelectedType: (type, value) =>
    dispatch(matchSlice.actions.updateSelectedType({type, value})),
});

export default connect(mapStateToProps, mapDispatchToProps)(WicketDialog);
