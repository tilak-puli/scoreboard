import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TeamNames from './screens/team-names/team-names-container';
import Dashboard from './screens/dashboard/dashboard-container';
import Scoreboard from './screens/scoreboard/scoreboard-container';
import Matches from './screens/matches/matches-container';
import Overs from './screens/overs/overs-container';
import {Icon} from 'react-native-elements';
import Stats from './screens/stats/stats-container';
import MostRuns from './screens/stats/components/most-runs';
import MostWickets from './screens/stats/components/most-wickets';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={BottomNavigator}
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
      <Stack.Screen
        name="Stats"
        component={Stats}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Most Runs"
        component={MostRuns}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Most Wickets"
        component={MostWickets}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const BottomNavigator = () => (
  <Tab.Navigator
    activeColor="#e91e63"
    labelStyle={{fontSize: 12}}
    style={{backgroundColor: 'tomato'}}>
    <Tab.Screen
      name={'New'}
      component={TeamNames}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="add" type="material" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name={'old'}
      component={Matches}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="assignment" type="material" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name={'stats'}
      component={Stats}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="assignment" type="material" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default RootNavigator;
