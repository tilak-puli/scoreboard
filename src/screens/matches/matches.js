import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import _ from 'lodash';

import CommonStyles from '../../stylesheet';
import {allMatches} from '../../storage/store';
import ScoreboardMini from '../dashboard/components/scoreboard-mini/scoreboard-mini';
import {Button, Card} from 'react-native-elements';
import ScoreboardMiniRow from '../dashboard/components/scoreboard-mini/scoreboard-mini-row';

const Matches = ({
  matches = [],
  navigation,
  loading,

  updateMatches,
  loadingMatches,
  clearMatches,
  setMatch,
}) => {
  useEffect(() => {
    loadingMatches(true);
    const fetchMatches = async () => {
      updateMatches(await allMatches());
    };
    fetchMatches();
    return clearMatches;
  }, []);

  if (matches.length === 0) {
    return (
      <SafeAreaView style={CommonStyles.basicPage}>
        <Text>No matches found. Create new match to see history here.</Text>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={CommonStyles.basicPage}>
        <Text>loading matches, please wait.</Text>
      </SafeAreaView>
    );
  }

  const sortedMatches = _.sortBy(matches, ['createdTime']).reverse();

  return (
    <ScrollView style={CommonStyles.basicPage}>
      {sortedMatches.map((m, i) => (
        <Match key={i} match={m} setMatch={setMatch} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

const Match = ({match, setMatch, navigation}) => {
  return (
    <Card>
      <Text>
        {new Date(match.createdTime).toLocaleString([], {
          timeStyle: 'short',
          dateStyle: 'short',
          hour12: true,
        })}
      </Text>
      <ScoreboardMiniRow
        team={match.team1}
        overs={match.overs}
        isBatting={match.battingTeam === 'team1'}
      />
      <ScoreboardMiniRow
        team={match.team2}
        overs={match.overs}
        isBatting={match.battingTeam === 'team2'}
      />
      <View style={CommonStyles.horizontalWithSpace}>
        <Button
          title={'Resume'}
          buttonStyle={{width: 150}}
          type={'clear'}
          onPress={() => {
            setMatch(match);
            navigation.navigate('Dashboard');
          }}
        />
        <Button
          title={'Score Board'}
          buttonStyle={{width: 150}}
          type={'clear'}
          onPress={() => {
            setMatch(match);
            navigation.navigate('Scoreboard');
          }}
        />
      </View>
    </Card>
  );
};

export default Matches;
