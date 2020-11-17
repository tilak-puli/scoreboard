import {connect} from 'react-redux';
import Overs from './overs';

const matchStateToProps = ({match}) => ({
  match,
});

export default connect(matchStateToProps)(Overs);
