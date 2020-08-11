import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Card} from 'react-native-elements';
import CommonStyles from '../../stylesheet';

const Dashboard = ({team1, team2}) => {
  return (
    <SafeAreaView style={CommonStyles.page}>
      <Card>
        <Text>{team1.name}</Text>
        <Text>{team2.name}</Text>
      </Card>
    </SafeAreaView>
  );
};

export default Dashboard;
