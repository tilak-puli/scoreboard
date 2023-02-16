import {connect} from 'react-redux';
import WicketDialog from './wicket-dialog';
import {matchSlice} from '../../../../reducers/match/reducer';
import {matchesSlice} from '../../../../reducers/matches/reducer';
import {
  getNonStriker,
  getStriker,
  getTeams,
} from '../../../../reducers/match/init-reducers';

const mapStateToProps = ({match, matches}) => {
  const {battingTeam} = getTeams(match);

  return {
    isVisible: match.wicketDialogVisible,
    striker: getStriker(battingTeam),
    nonStriker: getNonStriker(battingTeam),
    globalPlayers: Object.keys(matches.players || {}),
  };
};

const mapDispatchToProps = dispatch => ({
  addBall: () => dispatch(matchSlice.actions.addBall({runs: 0})),
  nextBatsman: name => {
    dispatch(matchSlice.actions.nextBatsman({name}));
    dispatch(matchesSlice.actions.addGlobalPlayer({name}));
  },
  cancel: () =>
    dispatch(matchSlice.actions.updateWicketDialogVisible({visible: false})),
  updateSelectedType: (type, value) =>
    dispatch(matchSlice.actions.updateSelectedType({type, value})),
  addGlobalPlayerName: name =>
    dispatch(matchesSlice.actions.addGlobalPlayer({name})),
});

export default connect(mapStateToProps, mapDispatchToProps)(WicketDialog);
