import {Card} from 'react-native-elements';
import React from 'react';
import {Text} from 'react-native';
import CommonStyles from '../../../../stylesheet';
import {View} from 'native-base';
import {getRunRate} from '../../../../reducers/match/score-reducers';
import {OverUtils} from '../../../../models/OverUtils';

function getOverLeft(over, validBalls, totalOvers) {
  let ballsLeft = 0;

  if (validBalls > 0) {
    ballsLeft = 6 - validBalls;
    over += 1;
  }

  return {over: totalOvers - over, balls: ballsLeft};
}

const ScoreboardMini = ({
  team1,
  team2,
  validBalls,
  battingTeam,
  innings,
  matchOvers,
}) => {
  const battingTeamData = battingTeam === 'team1' ? team1 : team2;
  const bowlingTeamData = battingTeam === 'team2' ? team1 : team2;
  const overLeft = getOverLeft(
    battingTeamData.over.over,
    validBalls,
    matchOvers,
  );

  return (
    <Card>
      <View style={{...CommonStyles.horizontalWithSpace, width: '100%'}}>
        <View style={CommonStyles.flex1}>
          <Text>
            {battingTeamData.name},{' '}
            {innings + '' + (innings === 1 ? 'st' : 'nd')} inning
          </Text>
          <View style={CommonStyles.horizontalWithSpace}>
            <View
              style={{...CommonStyles.horizontal, ...CommonStyles.textBottom}}>
              <Text style={CommonStyles.bigText}>
                {battingTeamData.runs} - {battingTeamData.wickets}{' '}
              </Text>
              <Text style={{...CommonStyles.mediumText, marginBottom: 10}}>
                {OverUtils.toString(battingTeamData.over)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            ...CommonStyles.horizontalWithSpace,
            ...CommonStyles.flex1,
            paddingLeft: 80,
            paddingRight: 20,
          }}>
          <View style={{justifyContent: 'space-between'}}>
            <Text>NRR</Text>
            <Text>
              {getRunRate(
                battingTeamData.runs,
                battingTeamData.over.over,
                validBalls,
              )}
            </Text>
          </View>
          {innings === 2 && (
            <View style={{justifyContent: 'space-between'}}>
              <Text>RR</Text>
              <Text>
                {getRunRate(
                  Math.max(bowlingTeamData.runs - battingTeamData.runs, 0),
                  overLeft.over,
                  overLeft.balls,
                )}
              </Text>
            </View>
          )}
        </View>
      </View>
      {innings === 2 && bowlingTeamData.runs >= battingTeamData.runs && (
        <View>
          <Text>
            {battingTeamData.name} needs{' '}
            {bowlingTeamData.runs - battingTeamData.runs + 1} runs in{' '}
            {overLeft.over * 6 + overLeft.balls} balls
          </Text>
        </View>
      )}
    </Card>
  );
};

export default ScoreboardMini;
