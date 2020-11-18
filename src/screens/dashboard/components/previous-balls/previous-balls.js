import {Card, Text} from 'react-native-elements';
import React from 'react';
import CommonStyles, {BallLogStyles} from '../../../../stylesheet';
import {View} from 'react-native';
import _ from 'lodash';

const Ball = ({run, types = {}}) => {
  const selectedTypes = Object.keys(types).filter((key) => types[key]);
  let typeLetter = '';
  let fontSize = 20;

  const firstShortType = shortTypes[selectedTypes[0]];
  if (firstShortType) {
    typeLetter = firstShortType;
  } else if (types.wicket) {
    typeLetter = 'W';
  }

  if (typeLetter) {
    fontSize = 15;
  }

  let ballText = run;
  if (typeLetter) {
    ballText = typeLetter;
    if (run) ballText = '' + run + typeLetter;
  }
  return (
    <View style={BallLogStyles.ballContainer}>
      <Text style={{...BallLogStyles.ballText, fontSize}}>{ballText}</Text>
    </View>
  );
};

const shortTypes = {
  noBall: 'nb',
  wide: 'wd',
  legByes: 'lb',
  byes: 'b',
};

const PreviousBalls = ({log = []}) => {
  const last6Balls = _.takeRight(log, 6);
  const last6BallDivs = [];
  let currentOver = parseInt(_.get(last6Balls[0], 'over'));

  last6Balls.forEach((ball, i) => {
    if (currentOver !== parseInt(ball.over)) {
      last6BallDivs.push(<Text style={CommonStyles.line} />);
      currentOver = parseInt(ball.over);
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

export default PreviousBalls;
