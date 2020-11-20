import {View} from 'react-native';
import React from 'react';
import {Table} from './table';

const MostRuns = ({route = {params: {}}, players = []}) => {
  const {players: routePlayers} = route.params;

  const batsmen = players.length === 0 ? routePlayers : players;

  const headData = ['Name', 'M', 'R', 'B', 'Avg'];
  const rowData = batsmen.map((p) => [
    p.name,
    p.matches || 1,
    p.batting.runs,
    p.batting.balls,
    p.batting.runs / p.matches || 1,
  ]);

  return (
    <View>
      <Table headData={headData} rowsData={rowData} />
    </View>
  );
};

export default MostRuns;
