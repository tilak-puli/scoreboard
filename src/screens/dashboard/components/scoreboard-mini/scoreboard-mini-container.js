import {connect} from 'react-redux';
import ScoreboardMini from './scoreboard-mini';
const mapStateToProps = ({match}) => ({
  team1: match.team1,
  team2: match.team2,
  overs: match.overs,
  battingTeam: match.battingTeam,
});

export default connect(mapStateToProps)(ScoreboardMini);
