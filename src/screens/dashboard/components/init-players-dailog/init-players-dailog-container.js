import {connect} from 'react-redux';
import {matchSlice} from '../../../../reducer';
import InitPlayersDialog from './init-players-dialog';

const mapStateToProps = ({match}) => ({
  isVisible: match.initPlayersDialogVisible || match.inningsOverDialogVisible,
});

const mapDispatchToProps = (dispatch) => ({
  updateInitPlayers: (striker, nonStriker, bowler) =>
    dispatch(
      matchSlice.actions.updateInitPlayers({striker, nonStriker, bowler}),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(InitPlayersDialog);
