import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import _ from 'lodash';

import CommonStyles from '../../stylesheet';
import {allMatches} from '../../storage/store';
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

  if (loading) {
    return (
      <SafeAreaView style={CommonStyles.centerPage}>
        <Text>loading matches, please wait.</Text>
      </SafeAreaView>
    );
  } else if (matches.length === 0) {
    return (
      <SafeAreaView style={CommonStyles.centerPage}>
        <Text>No matches found. Create new match to see history here.</Text>
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
      <Text style={{fontSize: 12}}>
        {new Date(match.createdTime).toLocaleString([], {
          timeStyle: 'short',
          dateStyle: 'short',
          hour12: true,
        })}
      </Text>
      <View
        style={{
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: '#AAA',
        }}>
        <ScoreboardMiniRow
          team={match.team1}
          overs={match.overs}
          isBatting={true}
        />
        <ScoreboardMiniRow
          team={match.team2}
          overs={match.overs}
          isBatting={true}
        />
        <MatchStatus match={match} />
      </View>
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

const MatchStatus = ({match}) => {
  if (match.matchOver) {
    return (
      <Text style={CommonStyles.greySmallText}>{match.matchOverMessage}</Text>
    );
  } else {
    return (
      <Text style={CommonStyles.greySmallText}>
        {'Toss won by ' +
          match['team' + match.tossWonByTeam].name +
          ' and elected to ' +
          match.selected}
      </Text>
    );
  }
};

export default Matches;
