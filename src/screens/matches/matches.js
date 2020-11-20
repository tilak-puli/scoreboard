import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import _ from 'lodash';

import CommonStyles from '../../stylesheet';
import {allMatches} from '../../storage/store';
import {Button, Card, Icon} from 'react-native-elements';
import ScoreboardMiniRow from '../dashboard/components/scoreboard-mini/scoreboard-mini-row';

const Matches = ({
  matches = [],
  navigation,
  loading,

  deleteMatch,
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
        <Match
          key={i}
          match={m}
          deleteMatch={deleteMatch}
          setMatch={setMatch}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

const Match = ({match, deleteMatch, setMatch, navigation}) => {
  return (
    <Card>
      <ShortTime time={match.createdTime} />
      <Status match={match} />
      <Actions
        match={match}
        deleteMatch={deleteMatch}
        setMatch={setMatch}
        navigation={navigation}
      />
    </Card>
  );
};

const ShortTime = ({time}) => (
  <Text style={{fontSize: 12}}>
    {new Date(time).toLocaleString([], {
      timeStyle: 'short',
      dateStyle: 'short',
      hour12: true,
    })}
  </Text>
);
const Status = ({match}) => (
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
    <StatusMessage match={match} />
  </View>
);

const Actions = ({match, setMatch, deleteMatch, navigation}) => (
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
    <Icon
      name="delete"
      type="material"
      color={'#aaaaaa'}
      size={26}
      onPress={deleteMatch.bind(null, match.createdTime)}
    />
  </View>
);

const StatusMessage = ({match}) => {
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
