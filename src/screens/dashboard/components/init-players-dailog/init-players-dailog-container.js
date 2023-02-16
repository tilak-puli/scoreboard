import {connect} from 'react-redux';
import InitPlayersDialog from './init-players-dialog';
import {matchSlice} from '../../../../reducers/match/reducer';
import {matchesSlice} from '../../../../reducers/matches/reducer';

const mapStateToProps = ({match}) => ({
  isVisible: match.initPlayersDialogVisible || match.inningsOverDialogVisible,
});

const mapDispatchToProps = dispatch => ({
  updateInitPlayers: (striker, nonStriker, bowler) => {
    dispatch(
      matchSlice.actions.updateInitPlayers({striker, nonStriker, bowler}),
    );
    dispatch(matchesSlice.actions.addGlobalPlayer({name: striker}));
    dispatch(matchesSlice.actions.addGlobalPlayer({name: nonStriker}));
    dispatch(matchesSlice.actions.addGlobalPlayer({name: bowler}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InitPlayersDialog);
