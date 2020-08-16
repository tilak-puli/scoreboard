import React from 'react';
import {Text, View} from 'react-native';
import CommonStyles from '../../../../stylesheet';
import {getOver} from '../../../../cricket-utils';

const ScoreboardMiniRow = ({team, overs, isBatting}) => {
  return (
    <View style={CommonStyles.horizontalWithSpace}>
      <View>
        <Text style={isBatting ? CommonStyles.selectedRowText : {}}>
          {team.name}
        </Text>
      </View>
      <View style={CommonStyles.horizontal}>
        <Text style={isBatting ? CommonStyles.selectedRowText : {}}>
          {team.runs}/{team.wickets}{' '}
        </Text>
        <Text style={isBatting ? CommonStyles.selectedRowText : {}}>
          ({getOver(team.balls)}/{overs})
        </Text>
      </View>
    </View>
  );
};

export default ScoreboardMiniRow;
