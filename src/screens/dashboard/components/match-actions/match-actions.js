import {Button, Card} from 'react-native-elements';
import React from 'react';
import CommonStyles from '../../../../stylesheet';

const MatchActions = ({navigation, endInnings}) => (
  <Card wrapperStyle={CommonStyles.horizontalWithSpace}>
    <Button
      title={'End Innings'}
      onPress={endInnings}
      buttonStyle={{
        backgroundColor: '#2a69ac',
      }}
    />
    <Button
      title={'Overs'}
      onPress={() => navigation.navigate('Overs')}
      buttonStyle={{
        backgroundColor: '#2a69ac',
      }}
    />
    <Button
      title={'Score Board'}
      onPress={() => navigation.navigate('Scoreboard')}
      buttonStyle={{
        backgroundColor: '#2a69ac',
      }}
    />
  </Card>
);

export default MatchActions;
