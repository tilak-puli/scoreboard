import React, {useEffect} from 'react';
import {BackHandler, SafeAreaView, View} from 'react-native';
import ScoreboardMini from './components/scoreboard-mini/scoreboard-mini-container';

import CommonStyles from '../../stylesheet';
import CurrentPlayers from './components/current-players/current-players-container';
import RunsInput from './components/runs-input/runs-input-container';
import InitPlayersDialog from './components/init-players-dailog/init-players-dailog-container';
import RunsInputDialog from './components/run-input-dailog/runs-input-dailog-container';
import NextBatsmanDialog from './components/next-player-dialog.js/next-batsman-dialog-container';
import NextBowlerDialog from './components/next-player-dialog.js/next-bowler-dialog-container';
import Actions from './components/actions/actions-container';
import BallType from './components/ball-type/ball-type-container';
import WicketDialog from './components/wicket-dailog/wicket-dialog-container';
import PreviousBalls from './components/previous-balls/previous-balls-container';
import MatchActions from './components/match-actions/match-actions-container';
import MatchOverDialog from './components/match-over-dialog.js/match-over-dialog-container';

const Dashboard = ({navigation}) => {
  useBackButton(() => {
    navigation.navigate('Home');
    return true;
  });

  return (
    <SafeAreaView style={CommonStyles.basicPage}>
      <ScoreboardMini />
      <CurrentPlayers />
      <PreviousBalls />
      <BallType />
      <View style={CommonStyles.horizontal}>
        <RunsInput />
        <Actions />
      </View>
      <MatchActions navigation={navigation} />

      <MatchOverDialog />
      <WicketDialog />
      <InitPlayersDialog />
      <RunsInputDialog />
      <NextBatsmanDialog />
      <NextBowlerDialog />
    </SafeAreaView>
  );
};

/* useBackButton */
function useBackButton(handler) {
  // Frustration isolated! Yay! 🎉
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
}

export default Dashboard;
