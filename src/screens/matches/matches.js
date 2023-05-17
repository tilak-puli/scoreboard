import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import _ from 'lodash';
import {useIsFocused} from '@react-navigation/native';

import CommonStyles from '../../stylesheet';
import {allMatches} from '../../storage/store';
import {Button, Card, Icon} from 'react-native-elements';
import ScoreboardMiniRow from '../dashboard/components/scoreboard-mini/scoreboard-mini-row';
import {downloadJson} from '../../utils';
import moment from 'moment';

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
  const isFocused = useIsFocused();

  useEffect(() => {
    loadingMatches(true);
    const fetchMatches = async () => {
      updateMatches(await allMatches());
    };
    fetchMatches();
    return clearMatches;
  }, [isFocused]);

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
      {sortedMatches?.map((m, i) => (
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
    <Card containerStyle={CommonStyles.cardStyle}>
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

const ShortTime = ({time}) => {
  const date = new Date(time);
  return (
    <Text style={{fontSize: 12}}>
      {moment(date).format('ddd, Do MMM, h:mm a')}
    </Text>
  );
};

const Status = ({match}) => (
  <View
    style={{
      paddingTop: 10,
      paddingBottom: 5,
    }}>
    <View style={{paddingBottom: 10}}>
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
    </View>
    <StatusMessage match={match} />
  </View>
);

const Actions = ({match, setMatch, deleteMatch, navigation}) => (
  <View style={CommonStyles.horizontalWithSpace}>
    <Button
      title={'Resume'}
      type={'clear'}
      buttonStyle={{backgroundColor: 'transparent'}}
      titleStyle={{color: 'rgba(0,0,0,0.67)'}}
      onPress={() => {
        setMatch(match);
        navigation.navigate('Dashboard');
      }}
    />
    <Button
      style={CommonStyles.flex1}
      title={'Score Board'}
      buttonStyle={{backgroundColor: 'transparent'}}
      titleStyle={{color: 'rgba(0,0,0,0.67)'}}
      onPress={() => {
        setMatch(match);
        navigation.navigate('Scoreboard');
      }}
    />
    <Icon
      name="share"
      type="material"
      style={{width: 130}}
      color={'rgba(0,0,0,0.67)'}
      size={22}
      onPress={() =>
        downloadJson(
          match,
          `${match.team1.name}_vs_${match.team2.name}_${Date.now()}`,
        )
      }
    />
    <Icon
      name="delete"
      type="material"
      style={{width: 130}}
      color={'rgba(0,0,0,0.67)'}
      size={22}
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
