import {connect} from 'react-redux';
import Dashboard from './dashboard';
import {matchSlice} from '../../reducer';
const mapStateToProps = ({match}) => ({
  team1: match.team1,
  team2: match.team2,
  overs: match.overs,
  battingTeam: match.battingTeam,
});

const mapDispatchToProps = (dispatch) => ({
  updateInitPlayers: (striker, nonStriker, bowler) => {
    dispatch(
      matchSlice.actions.updateInitPlayers({
        striker,
        nonStriker,
        bowler,
      }),
    );
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
