import {connect} from 'react-redux';
import {matchSlice} from '../../reducer';
import Home from './home';

const mapDispatchToProps = (dispatch) => ({
  createNewMatch: () => dispatch(matchSlice.actions.createNewMatch()),
});

export default connect(null, mapDispatchToProps)(Home);
