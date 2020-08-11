import {connect} from 'react-redux';
import Dashboard from './dashboard';

const mapStateToProps = ({match}) => ({
  team1: match.team1,
  team2: match.team2,
});
export default connect(mapStateToProps)(Dashboard);
