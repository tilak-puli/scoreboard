import React from 'react';
import {SafeAreaView, View} from 'react-native';
import _ from 'lodash';

import CommonStyles from '../../stylesheet';
import {Card, Text} from 'react-native-elements';
import {getTeams} from '../../reducers/init-reducers';
import {
  getBatsmanHeader,
  getBatsmanRow,
  getBowlerHeader,
  getBowlerRow,
} from '../dashboard/components/current-players/current-players';

const Scoreboard = ({match}) => {
  let {battingTeam, bowlingTeam} = getTeams(match);
  if (match.innings / 2 === 0) {
    //if second or fourth innings
    battingTeam = [bowlingTeam, (bowlingTeam = battingTeam)][0]; //swap;
  }
  let totalInnings = _.max([match.innings, 2]);

  let inningsDivs = [];

  for (let i = 1; i <= totalInnings; i++) {
    inningsDivs.push(
      <Innings
        battingTeam={battingTeam}
        bowlingTeam={bowlingTeam}
        innings={i}
      />,
    );
    battingTeam = [bowlingTeam, (bowlingTeam = battingTeam)][0]; //swap;
  }
  return (
    <SafeAreaView style={CommonStyles.basicPage}>{inningsDivs}</SafeAreaView>
  );
};

const Innings = ({battingTeam, bowlingTeam, innings}) => (
  <Card>
    <Text>Innings {innings}</Text>
    <View>
      {getBatsmanHeader()}
      <View>{battingTeam.players.map(getBatsmanRow)}</View>
    </View>
    <View>
      {getBowlerHeader()}
      <View>{bowlingTeam.players.map(getBowlerRow)}</View>
    </View>
  </Card>
);

export default Scoreboard;
