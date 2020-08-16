import React from 'react';
import {SafeAreaView, View} from 'react-native';
import ScoreboardMini from './components/scoreboard-mini/scoreboard-mini-container';

import CommonStyles from '../../stylesheet';
import CurrentPlayers from './components/current-players/current-players-container';
import RunsInput from './components/runs-input/runs-input-container';
import InitPlayersDialog from './components/init-players-dailog/init-players-dailog-container';
import RunsInputDialog from './components/run-input-dailog/runs-input-dailog-container';
import NextBatsmanDialog from './components/next-player-dialog.js/next-batsman-dialog-container';
import NextBowlerDialog from './components/next-player-dialog.js/next-bowler-dialog-container';
import Actions from './components/actions/actions-container';

const Dashboard = ({}) => {
  return (
    <SafeAreaView style={CommonStyles.basicPage}>
      <ScoreboardMini />
      <CurrentPlayers />
      <View style={CommonStyles.horizontal}>
        <RunsInput />
        <Actions />
      </View>

      <InitPlayersDialog />
      <RunsInputDialog />
      <NextBatsmanDialog />
      <NextBowlerDialog />
    </SafeAreaView>
  );
};

export default Dashboard;
