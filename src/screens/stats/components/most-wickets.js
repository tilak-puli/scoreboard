import {View} from 'react-native';
import React from 'react';
import {Table} from './table';

const MostWickets = ({route = {params: {}}, players = []}) => {
  const {players: routePlayers} = route.params;

  const batsmen = players.length === 0 ? routePlayers : players;

  const headData = ['Name', 'M', 'O', 'W'];
  const rowData = batsmen.map((p) => [
    p.name,
    p.matches || 1,
    p.bowling.over.over,
    p.bowling.wickets,
  ]);

  return (
    <View>
      <Table headData={headData} rowsData={rowData} />
    </View>
  );
};

export default MostWickets;
