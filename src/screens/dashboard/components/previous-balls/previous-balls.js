import {Button, Card, Text} from 'react-native-elements';
import React from 'react';
import CommonStyles, {
  BallLogStyles,
  RunsInputStyles,
} from '../../../../stylesheet';
import {View} from 'react-native';

const Ball = ({run}) => (
  <View style={BallLogStyles.ballContainer}>
    <Text style={BallLogStyles.ballText}>{run}</Text>
  </View>
);

const PreviousBalls = ({log}) => {
  return (
    <Card
      containerStyle={BallLogStyles.ballLog}
      wrapperStyle={CommonStyles.horizontal}>
      {log.map((ballLog, i) => (
        <Ball run={ballLog.runs} key={i} />
      ))}
    </Card>
  );
};
export default PreviousBalls;
