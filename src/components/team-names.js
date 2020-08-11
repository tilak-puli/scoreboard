import React from 'react';
import {Text} from 'react-native';
import {Input} from 'react-native-elements';

const TeamNames = () => {
  return (
    <>
      <Text>Select Teams</Text>
      <Input placeholder="Username" />
      <Input placeholder="Password" />
    </>
  );
};

export default TeamNames;
