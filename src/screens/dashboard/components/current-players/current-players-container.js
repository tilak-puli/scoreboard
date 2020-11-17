import {connect} from 'react-redux';
import CurrentPlayers from './current-players';
import {
  getCurrentBowler,
  getNonStriker,
  getStriker,
  getTeams,
} from '../../../../reducers/match/init-reducers';

const mapStateToProps = ({match}) => {
  const {battingTeam, bowlingTeam} = getTeams(match);
  return {
    striker: getStriker(battingTeam),
    nonStriker: getNonStriker(battingTeam),
    bowler: getCurrentBowler(bowlingTeam),
  };
};

export default connect(mapStateToProps)(CurrentPlayers);
