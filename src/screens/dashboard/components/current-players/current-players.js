import {Card, Text} from 'react-native-elements';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TableStyles} from '../../../../stylesheet';

function getBatsmanRow(batsman) {
  return (
    <View style={TableStyles.tableRow}>
      <Text style={TableStyles.nameItem}>{batsman.name}</Text>
      <Text style={TableStyles.rowItem}>{batsman.runs}</Text>
      <Text style={TableStyles.rowItem}>{batsman.balls}</Text>
      <Text style={TableStyles.rowItem}>{batsman.fours}</Text>
      <Text style={TableStyles.rowItem}>{batsman.sixers}</Text>
      <Text style={TableStyles.rowItem}>{batsman.strikeRate}</Text>
    </View>
  );
}
function getBowlerRow(bowler) {
  return (
    <View style={TableStyles.tableRow}>
      <Text style={TableStyles.nameItem}>{bowler.name}</Text>
      <Text style={TableStyles.rowItem}>{bowler.overs}</Text>
      <Text style={TableStyles.rowItem}>{bowler.maidens}</Text>
      <Text style={TableStyles.rowItem}>{bowler.runs}</Text>
      <Text style={TableStyles.rowItem}>{bowler.wickets}</Text>
      <Text style={TableStyles.rowItem}>{bowler.economyRate}</Text>
    </View>
  );
}

function getBatsmanHeader() {
  return (
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
}

function getBowlerHeader() {
  return (
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
      <Text style={TableStyles.rowItemFade}>ER</Text>
    </View>
  );
}

const CurrentPlayers = ({striker, nonStriker, bowler}) => {
  return (
    <Card>
      {getBatsmanHeader()}
      {getBatsmanRow(striker)}
      {getBatsmanRow(nonStriker)}
      {getBowlerHeader()}
      {getBowlerRow(bowler)}
    </Card>
  );
};

export default CurrentPlayers;
