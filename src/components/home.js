import React from 'react';

import {Button, Text} from 'react-native-elements';

const Home = ({navigation}) => {
  return (
    <>
      <Button
        title="New Match"
        onPress={() => navigation.navigate('TeamSelector')}
      />
    </>
  );
};

export default Home;
