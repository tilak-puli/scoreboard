import TeamNames from './team-names';
import {connect} from 'react-redux';
import {matchSlice} from '../../reducers/match/reducer';
import {createNewMatch} from '../../reducers/match/match-reducers';

const mapDispatchToProps = dispatch => ({
  updateMatchBasicDetails: (
    team1Name,
    team2Name,
    overs,
    tossWonByTeam,
    selected,
  ) => {
    dispatch(
      matchSlice.actions.updateMatchBasicDetails({
        team1Name,
        team2Name,
        overs,
        tossWonByTeam,
        selected,
      }),
    );
  },
  createNewMatch: () => dispatch(matchSlice.actions.createNewMatch()),
});
export default connect(null, mapDispatchToProps)(TeamNames);
