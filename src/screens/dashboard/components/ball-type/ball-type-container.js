import {connect} from 'react-redux';
import BallType from './ball-type';
import {matchSlice} from '../../../../reducers/match/reducer';

const mapStateToProps = ({match}) => ({
  selectedTypes: match.selectedTypes,
});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedType: (type, value) =>
    dispatch(matchSlice.actions.updateSelectedType({type, value})),
});

export default connect(mapStateToProps, mapDispatchToProps)(BallType);
