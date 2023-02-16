import React, {useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import _ from 'lodash';

import CommonStyles from '../../stylesheet';
import {allMatches} from '../../storage/store';
import {OverUtils} from '../../models/OverUtils';
import {downloadJson} from '../../utils';

const Stats = ({
  matches,
  loadingMatches,
  updateMatches,
  clearMatches,
  loading,

  navigation,
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
        <Text style={CommonStyles.centerPage}>Calculating stats....</Text>
      </SafeAreaView>
    );
  }

  const allPlayers = getAllPlayers(matches);

  return (
    <View style={CommonStyles.basicPage}>
      <Text
        style={{
          fontSize: 20,
          padding: 10,
          backgroundColor: 'rgba(222,220,220,0.71)',
        }}>
        Batting
      </Text>
      <Item
        name={'Most Runs'}
        onClick={() =>
          navigation.navigate('Most Runs', {players: getTopScorers(allPlayers)})
        }
      />
      <Text
        style={{
          fontSize: 20, 
          padding: 10,
          backgroundColor: 'rgba(222,220,220,0.71)',
        }}>
        Bowling
      </Text>
      <Item
        name={'Most Wickets'}
        onClick={() =>
          navigation.navigate('Most Wickets', {
            players: getTopWicketTakers(allPlayers),
          })
        }
      />
      <Item
        name={'Export data'}
        onClick={function () {
          downloadJson(matches);
        }}
      />
    </View>
  );
};

const Item = ({name, onClick}) => (
  <TouchableOpacity onPress={onClick}>
    <Text
      style={{
        fontSize: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#AAA',
      }}>
      {name}
    </Text>
  </TouchableOpacity>
);

const getTopScorers = players =>
  _.sortBy(players, p => p.batting.runs)
    .reverse()
    .splice(0, 10);

const getTopWicketTakers = players =>
  _.sortBy(players, p => p.bowling.wickets)
    .reverse()
    .splice(0, 10);

const getAllPlayers = matches =>
  _.flattenDeep(
    matches?.map(m => [
      _.cloneDeep(m.team1.players),
      _.cloneDeep(m.team2.players),
    ]),
  ).reduce(mergePlayers, []);

const mergePlayers = (players, p) => {
  const matchedIndx = players.findIndex(pl => pl.name === p.name);

  if (matchedIndx !== -1) {
    const player = players[matchedIndx];
    player.matches = player.matches ? player.matches + 1 : 2;

    player.batting.runs += p.batting.runs;
    player.batting.balls += p.batting.balls;
    player.batting.fours += p.batting.fours;
    player.batting.sixers += p.batting.sixers;

    player.bowling.wickets += p.bowling.wickets;
    player.bowling.over = OverUtils.concat(player.bowling.over, p.bowling.over);
    player.bowling.maidens += p.bowling.maidens;
    player.bowling.runs += p.bowling.runs;
  } else {
    players.push(p);
  }

  return players;
};
export default Stats;
