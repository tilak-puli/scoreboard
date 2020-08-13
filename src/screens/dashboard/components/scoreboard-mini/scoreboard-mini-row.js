import React from 'react';
import {Text, View} from 'react-native';
import CommonStyles from '../../../../stylesheet';

const ScoreboardMiniRow = ({team, overs, batting}) => {
  return (
    <View style={CommonStyles.matchStatusRow}>
      <View>
        <Text style={batting ? CommonStyles.selectedRowText : {}}>
          {team.name}
        </Text>
      </View>
      <View style={CommonStyles.horizontal}>
        <Text style={batting ? CommonStyles.selectedRowText : {}}>
          {team.runs}/{team.wickets}{' '}
        </Text>
        <Text style={batting ? CommonStyles.selectedRowText : {}}>
          ({team.overs}/{overs})
        </Text>
      </View>
    </View>
  );
};

export default ScoreboardMiniRow;
