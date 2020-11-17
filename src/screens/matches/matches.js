import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';

import CommonStyles from '../../stylesheet';
import {allMatches} from '../../storage/store';
import ScoreboardMini from '../dashboard/components/scoreboard-mini/scoreboard-mini';
import {Button} from 'react-native-elements';

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

  return (
    <SafeAreaView style={CommonStyles.basicPage}>
      {matches.map((m, i) => (
        <Match key={i} match={m} setMatch={setMatch} navigation={navigation} />
      ))}
    </SafeAreaView>
  );
};

const Match = ({match, setMatch, navigation}) => {
  return (
    <ScoreboardMini
      team1={match.team1}
      team2={match.team2}
      overs={match.overs}
      actions={[
        <Button
          title={'Resume'}
          buttonStyle={{width: 150}}
          type={'clear'}
          onPress={() => {
            setMatch(match);
            navigation.navigate('Dashboard');
          }}
        />,
        <Button
          title={'Score Board'}
          buttonStyle={{width: 150}}
          type={'clear'}
          onPress={() => {
            setMatch(match);
            navigation.navigate('Scoreboard');
          }}
        />,
      ]}
    />
  );
};

export default Matches;
