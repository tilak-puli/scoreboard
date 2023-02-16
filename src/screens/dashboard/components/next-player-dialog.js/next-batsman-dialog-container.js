import {connect} from 'react-redux';
import NextPlayerDialog from './next-player-dailog';
import {matchSlice} from '../../../../reducers/match/reducer';
import {matchesSlice} from '../../../../reducers/matches/reducer';

const mapStateToProps = ({match, matches}) => ({
  isVisible: match.nextBatsmanDialogVisible,
  playerType: 'Batsman',
  globalPlayers: Object.keys(matches.players || {}),
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
