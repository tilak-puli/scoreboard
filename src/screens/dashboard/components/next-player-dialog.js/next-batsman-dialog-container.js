import {connect} from 'react-redux';
import NextPlayerDialog from './next-player-dailog';
import {matchSlice} from '../../../../reducers/match/reducer';
import {matchesSlice} from '../../../../reducers/matches/reducer';

const mapStateToProps = ({match}) => ({
  isVisible: match.nextBatsmanDialogVisible,
  playerType: 'Batsman',
});

const mapDispatchToProps = dispatch => ({
  hide: () =>
    dispatch(
      matchSlice.actions.updateNextBatsmanDialogVisible({visible: false}),
    ),
  onContinue: name => {
    dispatch(matchSlice.actions.nextBatsman({name}));
    dispatch(matchesSlice.actions.addGlobalPlayer({name}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NextPlayerDialog);
