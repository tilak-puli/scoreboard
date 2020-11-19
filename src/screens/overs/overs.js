import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import _ from 'lodash';

import CommonStyles, {BallLogStyles} from '../../stylesheet';
import {Card, Text} from 'react-native-elements';
import {getTeams} from '../../reducers/match/init-reducers';
import {
  getBatsmanHeader,
  getBatsmanRow,
  getBowlerHeader,
  getBowlerRow,
} from '../dashboard/components/current-players/current-players';
import BallType from '../dashboard/components/ball-type/ball-type-container';
import {getTypeLetter} from '../dashboard/components/previous-balls/previous-balls';

const Overs = ({match}) => {
  let {battingTeam, bowlingTeam} = getTeams(match);
  if (match.innings / 2 === 0) {
    //if second or fourth innings
    battingTeam = [bowlingTeam, (bowlingTeam = battingTeam)][0]; //swap;
  }
  let totalInnings = _.max([match.innings, 1]);

  let inningsDivs = [];

  for (let i = 1; i <= totalInnings; i++) {
    inningsDivs.push(
      <Innings ballsLog={battingTeam.ballsLog} innings={i} key={i} />,
    );
    battingTeam = [bowlingTeam, (bowlingTeam = battingTeam)][0]; //swap;
  }
  return (
    <SafeAreaView style={CommonStyles.basicPage}>{inningsDivs}</SafeAreaView>
  );
};

const Innings = ({ballsLog, innings}) => {
  let groupedBalls = _.groupBy(ballsLog, (ball) => ball.over.over);

  return (
    <Card>
      <InningsTitle innings={innings} />
      {Object.entries(groupedBalls).map(([over, balls], i) => (
        <OverDiv over={over} balls={balls} key={i} />
      ))}
    </Card>
  );
};

const InningsTitle = ({innings}) => (
  <Text style={styles.inningsTitle}>Innings {innings}</Text>
);

const OverDiv = ({over, balls}) => (
  <View style={styles.over}>
    <OverHeading over={over} balls={balls} />
    <Balls balls={balls} />
  </View>
);

const OverHeading = ({over, balls}) => (
  <View style={styles.runs}>
    <Text>Over : {over}</Text>
    <Text>
      {balls.reduce((t, ball) => t + ball.runs + ball.extras, 0)} runs
    </Text>
  </View>
);

const Balls = ({balls}) => (
  <View style={styles.ballsContainer}>
    <BallsTitle balls={balls} />
    <View style={styles.balls}>
      {balls.map((ball) => (
        <Ball ball={ball} />
      ))}
    </View>
  </View>
);

const BallsTitle = ({balls}) => {
  const batsmen = _.uniq(_.flatten(balls.map((b) => b.batsmen))).join(' & ');
  const bowler = _.uniq(balls.map((b) => b.bowler)).join(' & ');
  return (
    <Text>
      {bowler} to {batsmen}
    </Text>
  );
};

const Ball = ({ball}) => {
  const typeLetter = getTypeLetter(ball.types);
  let ballText = ball.runs + ball.extras;
  if (typeLetter) ballText = ball.runs + ball.extras + '' + typeLetter;

  return (
    <View
      style={{
        ...BallLogStyles.ballContainer,
        width: 25,
        height: 25,
      }}>
      <Text style={{...BallLogStyles.ballText, fontSize: 10}}>{ballText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  over: {
    borderTopWidth: 1,
    borderTopColor: 'grey',

    paddingTop: 8,
    paddingBottom: 8,

    flexDirection: 'row',
    alignItems: 'center',
  },

  balls: {
    flexDirection: 'row',
  },

  ballsContainer: {minHeight: 55, justifyContent: 'space-between'},

  runs: {paddingRight: 15},

  inningsTitle: {
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Overs;
