import {Card, Text} from 'react-native-elements';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TableStyles} from '../../../../stylesheet';
import {OverUtils} from '../../../../models/OverUtils';

const CurrentPlayers = ({striker, nonStriker, bowler}) => {
  if (!striker || !nonStriker || !bowler) {
    return (
      <Card>
        {getBatsmanHeader()}
        {getBowlerHeader()}
      </Card>
    );
  }

  return (
    <Card>
      {getBatsmanHeader()}
      <View>
        {getBatsmanRow(striker, true)}
        {getBatsmanRow(nonStriker)}
      </View>
      {getBowlerHeader()}
      <View>{getBowlerRow(bowler)}</View>
    </Card>
  );
};

export function getBatsmanRow({name = '', batting}, star) {
  return (
    <View style={TableStyles.tableRow}>
      <Text
        style={{
          ...TableStyles.nameItem,
          color: star ? '#D2386C' : 'black',
          fontSize: 20,
        }}>
        {name + (star ? '*' : '')}
      </Text>
      <Text style={TableStyles.rowItem}>{batting.runs}</Text>
      <Text style={TableStyles.rowItem}>{batting.balls}</Text>
      <Text style={TableStyles.rowItem}>{batting.fours}</Text>
      <Text style={TableStyles.rowItem}>{batting.sixers}</Text>
      <Text style={TableStyles.rowItem}>{batting.strikeRate}</Text>
    </View>
  );
}
export function getBowlerRow({name, bowling}) {
  return (
    <View style={TableStyles.tableRow}>
      <Text style={TableStyles.nameItem}>{name}</Text>
      <Text style={TableStyles.rowItem}>
        {OverUtils.toString(bowling.over)}
      </Text>
      <Text style={TableStyles.rowItem}>{bowling.maidens}</Text>
      <Text style={TableStyles.rowItem}>{bowling.runs}</Text>
      <Text style={TableStyles.rowItem}>{bowling.wickets}</Text>
      <Text style={{...TableStyles.rowItem, width: 50}}>
        {bowling.economyRate}
      </Text>
    </View>
  );
}

export const getBatsmanHeader = () => (
  <View
    style={StyleSheet.flatten([TableStyles.tableRow, TableStyles.headerRow])}>
    <Text
      style={StyleSheet.flatten([
        TableStyles.rowItemFade,
        TableStyles.nameItem,
      ])}>
      Batsperson
    </Text>
    <Text style={TableStyles.rowItemFade}>R</Text>
    <Text style={TableStyles.rowItemFade}>B</Text>
    <Text style={TableStyles.rowItemFade}>4s</Text>
    <Text style={TableStyles.rowItemFade}>6s</Text>
    <Text style={TableStyles.rowItemFade}>SR</Text>
  </View>
);

export const getBowlerHeader = () => (
  <View
    style={StyleSheet.flatten([TableStyles.tableRow, TableStyles.headerRow])}>
    <Text
      style={StyleSheet.flatten([
        TableStyles.rowItemFade,
        TableStyles.nameItem,
      ])}>
      Bowler
    </Text>
    <Text style={TableStyles.rowItemFade}>O</Text>
    <Text style={TableStyles.rowItemFade}>M</Text>
    <Text style={TableStyles.rowItemFade}>R</Text>
    <Text style={TableStyles.rowItemFade}>W</Text>
    <Text style={{...TableStyles.rowItemFade, width: 50}}>ER</Text>
  </View>
);

export default CurrentPlayers;
