import {connect} from 'react-redux';
import CurrentPlayers from './current-players';

const mapStateToProps = ({match}) => {
  const battingTeam = match[match.battingTeam];
  const bowlingTeam = match[match.bowlingTeam];
  return {
    striker: battingTeam.batsPersons[battingTeam.strikerIndex],
    nonStriker: battingTeam.batsPersons[battingTeam.nonStrikerIndex],
    bowler: bowlingTeam.bowlers[bowlingTeam.bowlerIndex],
  };
};

export default connect(mapStateToProps)(CurrentPlayers);
