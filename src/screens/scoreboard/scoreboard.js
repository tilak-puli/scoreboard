import React from 'react';
import {SafeAreaView, View} from 'react-native';
import _ from 'lodash';

import CommonStyles, {TableStyles} from '../../stylesheet';
import {Card, Text} from 'react-native-elements';
import {getTeams} from '../../reducers/match/init-reducers';
import {
  getBatsmanHeader,
  getBatsmanRow,
  getBowlerHeader,
  getBowlerRow,
} from '../dashboard/components/current-players/current-players';

const Scoreboard = ({match}) => {
  let {battingTeam, bowlingTeam} = getTeams(match);
  if (match.innings / 2 !== 0) {
    //if second or fourth innings
    battingTeam = [bowlingTeam, (bowlingTeam = battingTeam)][0]; //swap;
  }
  let totalInnings = _.max([match.innings, 1]);

  let inningsDivs = [];

  for (let i = 1; i <= totalInnings; i++) {
    inningsDivs.push(
      <Innings
        battingTeam={battingTeam}
        bowlingTeam={bowlingTeam}
        innings={i}
        key={i}
      />,
    );
    battingTeam = [bowlingTeam, (bowlingTeam = battingTeam)][0]; //swap;
  }
  return (
    <SafeAreaView style={CommonStyles.basicPage}>{inningsDivs}</SafeAreaView>
  );
};

const Innings = ({battingTeam, bowlingTeam, innings}) => {
  const batsmen = battingTeam.players.filter(
    (p) => p.batting.balls > 0 || (p.batting.positions[innings - 1] ?? false),
  );
  const orderedBatsmen = _.sortBy(
    batsmen,
    (p) => p.batting.positions[innings - 1],
  );

  const validBowlers = bowlingTeam.players.filter(
    (b) => b.bowling.over.over > 0 || b.bowling.over.balls > 0,
  );

  return (
    <Card>
      <Text>Innings {innings}</Text>
      <View>
        {getBatsmanHeader()}
        <View>
          {orderedBatsmen.map((b) =>
            getBatsmanRow(b, !(b.batting.isOut || b.batting.isRetired)),
          )}
        </View>
      </View>
      <View style={TableStyles.tableRow}>
        <Text />
      </View>
      <View>
        {getBowlerHeader()}
        <View>{validBowlers.map(getBowlerRow)}</View>
      </View>
    </Card>
  );
};

export default Scoreboard;
