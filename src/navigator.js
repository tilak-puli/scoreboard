import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from './components/home';
import TeamNames from './components/team-names';
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
    </Stack.Navigator>
  );
};

export default RootNavigator;
