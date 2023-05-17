import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Card, Input} from 'react-native-elements';
import {Text} from 'native-base';
import CommonStyles from '../../stylesheet';

const TeamNames = ({updateMatchBasicDetails, createNewMatch, navigation}) => {
  const [team1Name, updateTeam1Name] = useState('');
  const [team2Name, updateTeam2Name] = useState('');
  const [overs, updateTotalOvers] = useState('');
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
      <Card
        titleStyle={CommonStyles.labelTitle}
        containerStyle={CommonStyles.cardStyle}>
        <Input
          onChangeText={updateTeam1Name}
          labelStyle={CommonStyles.labelTitle}
          value={team1Name}
          label={'Team 1'}
          errorMessage={t1NameER}
          placeholder="Host Team Name"
        />
        <Input
          onChangeText={updateTeam2Name}
          labelStyle={CommonStyles.labelTitle}
          value={team2Name}
          errorMessage={t2NameER}
          label={'Team 2'}
          placeholder="Visitor Team Name"
        />
      </Card>
      <Card containerStyle={CommonStyles.cardStyle}>
        <Input
          value={'' + overs}
          labelStyle={CommonStyles.labelTitle}
          label={'Overs'}
          errorMessage={oversER}
          keyboardType={'numeric'}
          onChangeText={o => {
            updateTotalOvers(+o || '');
          }}
          placeholder="Enter Total Overs"
        />
      </Card>
      <Card containerStyle={CommonStyles.cardStyle}>
        <View
          style={{
            marginBottom: 20,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              ...CommonStyles.labelTitle,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Toss won by
          </Text>
          <View style={CommonStyles.horizontal}>
            <Button
              type={winTossTeam === 1 ? 'solid' : 'clear'}
              buttonStyle={{
                backgroundColor: winTossTeam === 1 ? '#2a69ac' : 'transparent',
                minWidth: 80,
              }}
              onPress={() => updateWinTossTeam(1)}
              title={team1Name || 'Team 1'}
            />
            <Button
              type={winTossTeam === 2 ? 'solid' : 'clear'}
              onPress={() => updateWinTossTeam(2)}
              buttonStyle={{
                backgroundColor: winTossTeam === 2 ? '#2a69ac' : 'transparent',
                minWidth: 80,
              }}
              title={team2Name || 'Team 2'}
            />
          </View>
        </View>
        <View
          style={{
            marginBottom: 20,
            paddingLeft: 10,
          }}>
          <View>
            <Text
              style={{
                ...CommonStyles.labelTitle,
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Selected
            </Text>
          </View>
          <View style={CommonStyles.horizontal}>
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
        </View>
      </Card>
      <View style={{margin: 15}}>
        <Button
          onPress={submit}
          title="Start Match"
          buttonStyle={{
            backgroundColor: '#2a69ac',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TeamNames;
