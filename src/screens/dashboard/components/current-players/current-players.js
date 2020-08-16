import {Card, Text} from 'react-native-elements';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TableStyles} from '../../../../stylesheet';
import {getOver} from '../../../../cricket-utils';

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
        {getBatsmanRow(striker)}
        {getBatsmanRow(nonStriker)}
      </View>
      {getBowlerHeader()}
      <View>{getBowlerRow(bowler)}</View>
    </Card>
  );
};

function getBatsmanRow({name, batting}) {
  return (
    <View style={TableStyles.tableRow}>
      <Text style={TableStyles.nameItem}>{name}</Text>
      <Text style={TableStyles.rowItem}>{batting.runs}</Text>
      <Text style={TableStyles.rowItem}>{batting.balls}</Text>
      <Text style={TableStyles.rowItem}>{batting.fours}</Text>
      <Text style={TableStyles.rowItem}>{batting.sixers}</Text>
      <Text style={TableStyles.rowItem}>{batting.strikeRate}</Text>
    </View>
  );
}
function getBowlerRow({name, bowling}) {
  return (
    <View style={TableStyles.tableRow}>
      <Text style={TableStyles.nameItem}>{name}</Text>
      <Text style={TableStyles.rowItem}>{getOver(bowling.balls)}</Text>
      <Text style={TableStyles.rowItem}>{bowling.maidens}</Text>
      <Text style={TableStyles.rowItem}>{bowling.runs}</Text>
      <Text style={TableStyles.rowItem}>{bowling.wickets}</Text>
      <Text style={TableStyles.rowItem}>{bowling.economyRate}</Text>
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
export default CurrentPlayers;
