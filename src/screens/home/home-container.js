import {connect} from 'react-redux';
import Home from './home';
import {matchSlice} from '../../reducers/match/reducer';

const mapDispatchToProps = (dispatch) => ({
  createNewMatch: () => dispatch(matchSlice.actions.createNewMatch()),
});

export default connect(null, mapDispatchToProps)(Home);
