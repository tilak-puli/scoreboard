import {connect} from 'react-redux';
import Scoreboard from './scoreboard';

const matchStateToProps = ({match}) => ({
  match,
});

export default connect(matchStateToProps)(Scoreboard);
