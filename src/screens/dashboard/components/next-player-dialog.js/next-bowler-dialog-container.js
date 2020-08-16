import {connect} from 'react-redux';
import NextPlayerDialog from './next-player-dailog';
import {matchSlice} from '../../../../reducer';

const mapStateToProps = ({match}) => ({
  isVisible: match.nextBowlerDialogVisible,
  playerType: 'Bowler',
});

const mapDispatchToProps = (dispatch) => ({
  hide: () =>
    dispatch(
      matchSlice.actions.updateNextBowlerDialogVisible({visible: false}),
    ),
  onContinue: (name) => dispatch(matchSlice.actions.nextBowler({name})),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextPlayerDialog);
