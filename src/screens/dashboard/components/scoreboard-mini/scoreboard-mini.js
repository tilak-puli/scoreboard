import {Card} from 'react-native-elements';
import React from 'react';
import ScoreboardMiniRow from './scoreboard-mini-row';
import {View} from 'react-native';
import CommonStyles from '../../../../stylesheet';

const ScoreboardMini = ({team1, team2, overs, battingTeam, actions = []}) => {
  return (
    <Card>
      <ScoreboardMiniRow
        team={team1}
        overs={overs}
        isBatting={battingTeam === 'team1'}
      />
      <ScoreboardMiniRow
        team={team2}
        overs={overs}
        isBatting={battingTeam === 'team2'}
      />
      <View style={CommonStyles.horizontalWithSpace}>{actions}</View>
    </Card>
  );
};

export default ScoreboardMini;
