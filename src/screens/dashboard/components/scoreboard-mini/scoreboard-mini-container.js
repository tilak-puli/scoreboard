import {connect} from 'react-redux';
import ScoreboardMini from './scoreboard-mini';
const mapStateToProps = ({match}) => ({
  team1: match.team1,
  team2: match.team2,
  validBalls: match.validBalls,
  battingTeam: match.battingTeam,
  innings: match.innings,
  matchOvers: match.overs,
});

export default connect(mapStateToProps)(ScoreboardMini);
