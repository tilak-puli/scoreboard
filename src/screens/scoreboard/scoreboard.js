import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
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
import {OverUtils} from '../../models/OverUtils';
import {getRunRate} from '../../reducers/match/score-reducers';

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
  return <ScrollView style={CommonStyles.basicPage}>{inningsDivs}</ScrollView>;
};

function getExtrasText(extras) {
  const all = Object.values(extras)?.reduce((a, b) => a + b);
  return `${all} ${extras.byes} B, ${extras.wide} WD, ${extras.noBall} NB`;
}

function getTotalText(battingTeam) {
  return `${battingTeam.runs} - ${battingTeam.wickets} (${OverUtils.toString(
    battingTeam.over,
  )}) ${getRunRate(
    battingTeam.runs,
    battingTeam.over.over,
    battingTeam.over.balls,
  )}`;
}

const Innings = ({battingTeam, bowlingTeam, innings}) => {
  const batsmen = battingTeam.players.filter(
    p => p.batting.balls > 0 || (p.batting.positions[innings - 1] ?? false),
  );
  const batsmenRows = [];

  orderBatsmen(batsmen, innings).forEach(b => {
    const isOut = b.batting.isOut || b.batting.isRetired;
    batsmenRows.push(
      <View style={{borderBottomWidth: 1, borderBottomColor: '#DDD'}}>
        {getBatsmanRow(b, !isOut)}
        <OutMessage batsman={b} />
      </View>,
    );
  });

  return (
    <Card>
      <View style={{...CommonStyles.horizontalWithSpace, marginBottom: 10}}>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            ...CommonStyles.mediumText,
          }}>
          {battingTeam.name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            ...CommonStyles.mediumText,
          }}>
          {battingTeam.runs} - {battingTeam.wickets} (
          {OverUtils.toString(battingTeam.over)})
        </Text>
      </View>
      <View>
        {getBatsmanHeader()}
        <View>{batsmenRows}</View>
        <View
          style={{
            ...TableStyles.tableRow,
            borderBottomWidth: 1,
            padding: 5,
            borderBottomColor: '#DDD',
          }}>
          <Text>Extras</Text>
          <Text>{getExtrasText(bowlingTeam.extras)}</Text>
        </View>
        <View
          style={{
            ...TableStyles.tableRow,
            padding: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#DDD',
          }}>
          <Text>Total</Text>
          <Text>{getTotalText(battingTeam)}</Text>
        </View>
      </View>
      <View style={TableStyles.tableRow}>
        <Text />
      </View>
      <View>
        {getBowlerHeader()}
        <View>
          {getValidBowlers(bowlingTeam.players).map(b => (
            <View style={{padding: 5}}>{getBowlerRow(b)}</View>
          ))}
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
  const {wicketMessage} = batsman.batting;

  return (
    <View>
      <Text
        style={{
          ...CommonStyles.greySmallText,
          paddingLeft: 5,
          paddingBottom: 2,
        }}>
        {wicketMessage}
      </Text>
    </View>
  );
};

const orderBatsmen = (batsmen, innings) =>
  _.sortBy(batsmen, p => p.batting.positions[innings - 1]);

const getValidBowlers = players =>
  players.filter(b => b.bowling.over.over > 0 || b.bowling.over.balls > 0);

export default Scoreboard;
