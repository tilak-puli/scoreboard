/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigator';
import store from './src/store';
import {Root} from 'native-base';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root>
          <RootNavigator />
        </Root>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
