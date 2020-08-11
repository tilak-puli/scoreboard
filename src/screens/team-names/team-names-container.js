import TeamNames from './team-names';
import {connect} from 'react-redux';
import {matchSlice} from '../../reducer';

const mapDispatchToProps = (dispatch) => ({
  updateTeamNames: (team1Name, team2Name) => {
    dispatch(matchSlice.actions.updateTeamNames({team1Name, team2Name}));
  },
});
export default connect(null, mapDispatchToProps)(TeamNames);
