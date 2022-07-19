import React, {useEffect} from 'react';
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
import {WICKET_TYPES} from '../../constants';

const Scoreboard = ({match, updateMatches}) => {
  let {battingTeam, bowlingTeam} = getTeams(match);
  let totalInnings = _.max([match.innings, 1]);

  useEffect(() => {
    return () => updateMatches();
  }, []);

  if (match.innings % 2 === 0) {
    //if second or fourth innings
    battingTeam = [bowlingTeam, (bowlingTeam = battingTeam)][0]; //swap;
  }

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
  const batsmenRows = [];

  orderBatsmen(batsmen, innings).forEach((b) => {
    const isOut = b.batting.isOut || b.batting.isRetired;
    batsmenRows.push(
      <View
        style={{padding: 5, borderBottomWidth: 1, borderBottomColor: '#DDD'}}>
        {getBatsmanRow(b, !isOut)}
        <OutMessage batsman={b} />
      </View>,
    );
  });

  return (
    <Card>
      <Text style={{textAlign: 'center', marginBottom: 10}}>
        Innings {innings}
      </Text>
      <View>
        {getBatsmanHeader()}
        <View style={{paddingLeft: 5}}>{batsmenRows}</View>
      </View>
      <View style={TableStyles.tableRow}>
        <Text />
      </View>
      <View>
        {getBowlerHeader()}
        <View style={{paddingLeft: 5}}>
          {getValidBowlers(bowlingTeam.players).map(getBowlerRow)}
        </View>
      </View>
    </Card>
  );
};

export function getOutMessage(wicketCause, wicketHelper, wicketBowler) {
  if (wicketCause === WICKET_TYPES.CATCH) {
    return 'c ' + wicketHelper + ' b ' + wicketBowler;
  } else if (wicketCause === WICKET_TYPES.STUMP_OUT) {
    return 'st ' + wicketHelper + ' b ' + wicketBowler;
  } else if (wicketCause === WICKET_TYPES.RUN_OUT) {
    return 'runout (' + wicketHelper + ' / ' + wicketBowler + ')';
  } else if (wicketCause === WICKET_TYPES.HIT_WICKET) {
    return 'hit wicket ' + wicketBowler;
  } else if (wicketCause === WICKET_TYPES.LBW) {
    return 'lbw ' + wicketBowler;
  } else if (wicketCause === WICKET_TYPES.OTHER) {
    return 'other ' + wicketBowler;
  } else if (wicketCause === WICKET_TYPES.BOWLED) {
    return 'b ' + wicketBowler;
  } else {
    return 'not out';
  }
}

const OutMessage = ({batsman}) => {
  const {wicketCause, wicketHelper, wicketBowler} = batsman.batting;
  let message = getOutMessage(wicketCause, wicketHelper, wicketBowler);

  return (
    <View style={TableStyles.tableRow}>
      <Text style={CommonStyles.greySmallText}>{message}</Text>
    </View>
  );
};

const orderBatsmen = (batsmen, innings) =>
  _.sortBy(batsmen, (p) => p.batting.positions[innings - 1]);

const getValidBowlers = (players) =>
  players.filter((b) => b.bowling.over.over > 0 || b.bowling.over.balls > 0);

export default Scoreboard;
