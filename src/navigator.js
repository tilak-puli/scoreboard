import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import TeamNames from './screens/team-names/team-names-container';
import Dashboard from './screens/dashboard/dashboard-container';
import Scoreboard from './screens/scoreboard/scoreboard-container';
import Matches from './screens/matches/matches-container';
import Overs from './screens/overs/overs-container';
import {Icon} from 'react-native-elements';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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
    </Stack.Navigator>
  );
};

const BottomNavigator = () => (
  <Tab.Navigator
    shifting={false}
    labelStyle={{fontSize: 12}}
    barStyle={{backgroundColor: 'white'}}
    activeColor={'rgba(21,62,117,0.84)'}>
    <Tab.Screen
      name={'New Match'}
      component={TeamNames}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="sports-cricket" type={'material'} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={'History'}
      component={Matches}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="history" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default RootNavigator;
