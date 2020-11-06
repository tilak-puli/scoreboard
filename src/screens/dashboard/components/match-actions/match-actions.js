import {Button, Card} from 'react-native-elements';
import React from 'react';
import CommonStyles from '../../../../stylesheet';

const MatchActions = ({endInnings}) => (
  <Card wrapperStyle={CommonStyles.horizontalWithSpace}>
    <Button title={'End Innings'} onPress={endInnings} />
  </Card>
);

export default MatchActions;
