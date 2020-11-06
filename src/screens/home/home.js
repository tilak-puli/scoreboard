import React from 'react';

import {Button, Card} from 'react-native-elements';
import CommonStyles from '../../stylesheet';
import {SafeAreaView} from 'react-native';

const Home = ({navigation, createNewMatch}) => {
  return (
    <SafeAreaView style={CommonStyles.page}>
      <Card>
        <Button
          title="New Match"
          onPress={() => {
            navigation.navigate('TeamSelector');
            createNewMatch();
          }}
        />
      </Card>
    </SafeAreaView>
  );
};

export default Home;