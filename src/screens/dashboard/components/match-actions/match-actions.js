import {Button, Card} from 'react-native-elements';
import React from 'react';
import CommonStyles from '../../../../stylesheet';

const MatchActions = ({navigation, endInnings}) => (
  <Card wrapperStyle={CommonStyles.horizontalWithSpace}>
    <Button
      title={'End Innings'}
      onPress={endInnings}
      buttonStyle={{
        backgroundColor: '#153e75',
      }}
    />
    <Button
      title={'Overs'}
      onPress={() => navigation.navigate('Overs')}
      buttonStyle={{
        backgroundColor: '#153e75',
      }}
    />
    <Button
      title={'Score Board'}
      onPress={() => navigation.navigate('Scoreboard')}
      buttonStyle={{
        backgroundColor: '#153e75',
      }}
    />
  </Card>
);

export default MatchActions;
