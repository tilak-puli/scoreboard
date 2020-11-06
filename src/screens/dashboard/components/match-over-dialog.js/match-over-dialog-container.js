import {connect} from 'react-redux';
import MatchOverDialog from './match-over-dailog';
import {matchSlice} from '../../../../reducer';

const mapStateToProps = ({match}) => ({
  visible: match.matchOverDialogVisible,
  name: match.matchWonBy,
  message: match.matchOverMessage,
});

const mapDispatchToProps = (dispatch) => ({
  hide: () =>
    dispatch(matchSlice.actions.updateMatchOverDialogVisible({visible: false})),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchOverDialog);
