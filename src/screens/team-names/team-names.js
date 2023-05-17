import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Card, Input} from 'react-native-elements';
import {Text} from 'native-base';
import CommonStyles from '../../stylesheet';

const TeamNames = ({updateMatchBasicDetails, createNewMatch, navigation}) => {
  const [team1Name, updateTeam1Name] = useState('');
  const [team2Name, updateTeam2Name] = useState('');
  const [overs, updateTotalOvers] = useState(0);
  const [winTossTeam, updateWinTossTeam] = useState(1);
  const [selected, updatedSelected] = useState('batting');

  const [t1NameER, updateT1NameER] = useState('');
  const [t2NameER, updateT2NameER] = useState('');
  const [oversER, updateOversER] = useState('');

  const submit = () => {
    let error = false;
    if (team1Name.trim().length === 0) {
      updateT1NameER('Please enter team1 name');
      error = true;
    } else {
      updateT1NameER('');
    }
    if (team2Name.trim().length === 0) {
      updateT2NameER('Please enter team2 name');
      error = true;
    } else {
      updateT2NameER('');
    }
    if (overs < 1) {
      updateOversER('Please enter minimum 1');
      error = true;
    } else {
      updateOversER('');
    }
    if (error) {
      return;
    }

    createNewMatch();
    updateMatchBasicDetails(
      team1Name.trim(),
      team2Name.trim(),
      overs,
      winTossTeam,
      selected,
    );

    updateTeam1Name('');
    updateTeam2Name('');
    updateTotalOvers(2);
    updateWinTossTeam(1);
    updatedSelected('batting');

    navigation.navigate('Dashboard');
  };
  return (
    <SafeAreaView style={CommonStyles.page}>
      <Card title="Select Teams">
        <Input
          onChangeText={updateTeam1Name}
          value={team1Name}
          label={'Team 1'}
          errorMessage={t1NameER}
          placeholder="Enter Team1 Name"
        />
        <Input
          onChangeText={updateTeam2Name}
          value={team2Name}
          errorMessage={t2NameER}
          label={'Team 2'}
          placeholder="Enter Team 2 Name"
        />
        <Input
          value={'' + overs}
          label={'Overs'}
          errorMessage={oversER}
          keyboardType={'numeric'}
          onChangeText={o => {
            updateTotalOvers(+o || '');
          }}
          placeholder="Overs"
        />
        <View
          style={{
            ...CommonStyles.horizontal,
            marginBottom: 20,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              ...CommonStyles.horizontalLabel,
              color: '#86939e',
              fontWeight: 'bold',
            }}>
            Toss won by:
          </Text>
          <Button
            type={winTossTeam === 1 ? 'solid' : 'clear'}
            buttonStyle={{
              backgroundColor: winTossTeam === 1 ? '#2a69ac' : 'transparent',
              width: 80,
            }}
            onPress={() => updateWinTossTeam(1)}
            title="Team 1"
          />
          <Button
            type={winTossTeam === 2 ? 'solid' : 'clear'}
            onPress={() => updateWinTossTeam(2)}
            buttonStyle={{
              backgroundColor: winTossTeam === 2 ? '#2a69ac' : 'transparent',
              width: 80,
            }}
            title="Team 2"
          />
        </View>
        <View
          style={{
            ...CommonStyles.horizontal,
            marginBottom: 20,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              ...CommonStyles.horizontalLabel,
              color: '#86939e',
              fontWeight: 'bold',
            }}>
            Selected:
          </Text>
          <Button
            type={selected === 'batting' ? 'solid' : 'clear'}
            buttonStyle={{
              backgroundColor:
                selected === 'batting' ? '#2a69ac' : 'transparent',
              width: 80,
            }}
            onPress={() => updatedSelected('batting')}
            title="Batting"
          />
          <Button
            type={selected === 'bowling' ? 'solid' : 'clear'}
            buttonStyle={{
              backgroundColor:
                selected === 'bowling' ? '#2a69ac' : 'transparent',
              width: 80,
            }}
            onPress={() => updatedSelected('bowling')}
            title="Bowling"
          />
        </View>
        <Button
          onPress={submit}
          title="Start Match"
          buttonStyle={{
            backgroundColor: '#2a69ac',
          }}
        />
      </Card>
    </SafeAreaView>
  );
};

export default TeamNames;
