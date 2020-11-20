import {View} from 'react-native';
import {Row, Rows, Table as ReactTable} from 'react-native-table-component';
import {TableStyles} from '../../../stylesheet';
import React from 'react';

export const Table = ({headData, rowsData}) => (
  <View>
    <ReactTable
      borderStyle={{
        borderColor: 'transparent',
      }}>
      <Row
        style={TableStyles.headerRow}
        textStyle={{padding: 5, textAlign: 'center', fontSize: 16}}
        data={headData}
      />
      <Rows
        data={rowsData}
        textStyle={{
          padding: 5,
          paddingTop: 10,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#DDD',

          textAlign: 'center',
          color: '#222',
          fontSize: 16,
        }}
      />
    </ReactTable>
  </View>
);
