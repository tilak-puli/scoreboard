import {StyleSheet} from 'react-native';

const CommonStyles = StyleSheet.create({
  page: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  basicPage: {
    height: '100%',
    width: '100%',
  },
  dailog: {
    width: '90%',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizontalLabel: {
    width: 100,
  },
  selectedRowText: {
    fontSize: 20,
  },
});

export const TableStyles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerRow: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: 'lightgrey',
  },
  rowItemFade: {
    color: 'grey',
    width: 20,
  },
  nameItem: {
    width: 90,
  },
  rowItem: {
    width: 20,
  },
});

export default CommonStyles;
