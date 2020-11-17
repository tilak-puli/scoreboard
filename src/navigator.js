import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/home/home-container';
import TeamNames from './screens/team-names/team-names-container';
import Dashboard from './screens/dashboard/dashboard-container';
import Scoreboard from './screens/scoreboard/scoreboard-container';
import Matches from './screens/matches/matches-container';
import Overs from './screens/overs/overs-container';
const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TeamSelector"
        component={TeamNames}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Scoreboard"
        component={Scoreboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Overs"
        component={Overs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllMatches"
        component={Matches}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
