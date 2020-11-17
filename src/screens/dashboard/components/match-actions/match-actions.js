import {Button, Card} from 'react-native-elements';
import React from 'react';
import CommonStyles from '../../../../stylesheet';

const MatchActions = ({navigation, endInnings}) => (
  <Card wrapperStyle={CommonStyles.horizontalWithSpace}>
    <Button title={'End Innings'} onPress={endInnings} />
    <Button title={'Overs'} onPress={() => navigation.navigate('Overs')} />
    <Button
      title={'Score Board'}
      onPress={() => navigation.navigate('Scoreboard')}
    />
  </Card>
);

export default MatchActions;
