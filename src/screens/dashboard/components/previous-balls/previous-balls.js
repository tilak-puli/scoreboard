import {Card, Text} from 'react-native-elements';
import React from 'react';
import CommonStyles, {BallLogStyles} from '../../../../stylesheet';
import {StyleSheet, View} from 'react-native';
import _ from 'lodash';
import {getBallColor} from '../../../overs/overs';

const shortTypes = {
  noBall: 'nb',
  wide: 'wd',
  legByes: 'lb',
  byes: 'b',
};

const PreviousBalls = ({log = []}) => {
  const last6Balls = _.takeRight(log, 6);
  const last6BallDivs = [];
  let currentOver = _.get(last6Balls[0], 'over.over');

  last6Balls.forEach((ball, i) => {
    if (currentOver !== ball.over.over) {
      last6BallDivs.push(
        <Text key={ball.over.over + '' + i} style={CommonStyles.line} />,
      );
      currentOver = ball.over.over;
    }

    last6BallDivs.push(
      <Ball run={ball.runs + ball.extras} types={ball.types} key={i} />,
    );
  });

  return (
    <Card
      containerStyle={BallLogStyles.ballLog}
      wrapperStyle={CommonStyles.horizontal}>
      {last6BallDivs}
    </Card>
  );
};

const Ball = ({run, types = {}}) => {
  let fontSize = 20;
  const typeLetter = getTypeLetter(types);

  if (typeLetter) {
    fontSize = 15;
  }

  let ballText = run;
  if (typeLetter) {
    ballText = typeLetter;
    if (run) {
      ballText = '' + run + typeLetter;
    }
  }

  const backgroundColor = getBallColor(run, types?.wicket);

  return (
    <View
      style={StyleSheet.flatten([
        BallLogStyles.ballContainer,
        {backgroundColor},
      ])}>
      <Text
        style={{
          ...BallLogStyles.ballText,
          fontSize,
          color: backgroundColor === 'white' ? 'black' : 'white',
        }}>
        {ballText}
      </Text>
    </View>
  );
};

export const getTypeLetter = (types = {}) => {
  const selectedTypes = Object.keys(types).filter(key => types[key]);
  let typeLetter = '';

  const firstShortType = shortTypes[selectedTypes[0]];
  if (firstShortType) {
    typeLetter = firstShortType;
  } else if (types.wicket) {
    typeLetter = 'W';
  }
  return typeLetter;
};

export default PreviousBalls;
