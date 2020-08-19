import {connect} from 'react-redux';
import PreviousBalls from './previous-balls';
import {getTeams} from '../../../../reducers/init-reducers';

const mapStateToProps = ({match}) => ({
  log: getTeams(match).battingTeam.ballsLog,
});

export default connect(mapStateToProps)(PreviousBalls);
