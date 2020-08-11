import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Card, Input} from 'react-native-elements';
import CommonStyles from '../../stylesheet';

const TeamNames = ({updateTeamNames, navigation}) => {
  const [team1Name, updateTeam1Name] = useState('');
  const [team2Name, updateTeam2Name] = useState('');

  return (
    <SafeAreaView style={CommonStyles.page}>
      <Card title="Select Teams">
        <Input onChangeText={updateTeam1Name} placeholder="Team 1 Name" />
        <Input onChangeText={updateTeam2Name} placeholder="Team 2 Name" />
        <Button
          onPress={() => {
            updateTeamNames(team1Name, team2Name);
            navigation.navigate('Dashboard');
          }}
          title="Start Match"
        />
      </Card>
    </SafeAreaView>
  );
};

export default TeamNames;
