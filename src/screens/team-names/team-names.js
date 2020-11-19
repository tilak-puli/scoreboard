import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Card, Input} from 'react-native-elements';
import {Text} from 'native-base';
import CommonStyles from '../../stylesheet';

const TeamNames = ({updateMatchBasicDetails, navigation}) => {
  const [team1Name, updateTeam1Name] = useState('');
  const [team2Name, updateTeam2Name] = useState('');
  const [overs, updateTotalOvers] = useState(2);
  const [winTossTeam, updateWinTossTeam] = useState(1);
  const [selected, updatedSelected] = useState('batting');

  return (
    <SafeAreaView style={CommonStyles.page}>
      <Card title="Select Teams">
        <Input
          onChangeText={updateTeam1Name}
          label={'team1 Name'}
          placeholder="Enter Team1 Name"
        />
        <Input
          onChangeText={updateTeam2Name}
          label={'team2 Name'}
          placeholder="Enter Team 2 Name"
        />
        <Input
          label={'overs'}
          onChangeText={(o) => updateTotalOvers(+o)}
          placeholder="Overs"
        />
        <View style={{...CommonStyles.horizontal, marginBottom: 5}}>
          <Text style={CommonStyles.horizontalLabel}>Toss won by:</Text>
          <Button
            type={winTossTeam === 1 ? 'solid' : 'clear'}
            onPress={() => updateWinTossTeam(1)}
            title="Team 1"
          />
          <Button
            type={winTossTeam === 2 ? 'solid' : 'clear'}
            onPress={() => updateWinTossTeam(2)}
            title="Team 2"
          />
        </View>
        <View style={{...CommonStyles.horizontal, marginBottom: 5}}>
          <Text style={CommonStyles.horizontalLabel}>Selected:</Text>
          <Button
            type={selected === 'batting' ? 'solid' : 'clear'}
            onPress={() => updatedSelected('batting')}
            title="Batting"
          />
          <Button
            type={selected === 'bowling' ? 'solid' : 'clear'}
            onPress={() => updatedSelected('bowling')}
            title="Bowling"
          />
        </View>
        <Button
          onPress={() => {
            updateMatchBasicDetails(
              team1Name,
              team2Name,
              overs,
              winTossTeam,
              selected,
            );
            navigation.navigate('Dashboard');
          }}
          title="Start Match"
        />
      </Card>
    </SafeAreaView>
  );
};

export default TeamNames;
