import {connect} from 'react-redux';
import NextPlayerDialog from './match-over-dailog';

const mapStateToProps = ({match}) => ({
  matchOver: match.matchOver,
});

export default connect(mapStateToProps)(NextPlayerDialog);
