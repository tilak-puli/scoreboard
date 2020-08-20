import {Card, Text} from 'react-native-elements';
import React from 'react';
import CommonStyles, {BallLogStyles} from '../../../../stylesheet';
import {View} from 'react-native';

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

  return (
    <View style={BallLogStyles.ballContainer}>
      <Text style={{...BallLogStyles.ballText, fontSize}}>
        {'' + run + typeLetter}
      </Text>
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
  return (
    <Card
      containerStyle={BallLogStyles.ballLog}
      wrapperStyle={CommonStyles.horizontal}>
      {log.slice(0, 7).map((ballLog, i) => (
        <Ball
          run={ballLog.runs + ballLog.extras}
          types={ballLog.types}
          key={i}
        />
      ))}
    </Card>
  );
};
export default PreviousBalls;
