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
  dialog: {
    width: '90%',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  horizontalWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  basicMargin: {
    margin: 5,
  },
  horizontalLabel: {
    width: 100,
  },
  selectedRowText: {
    fontSize: 20,
  },
  actionsContainer: {
    width: '30%',
    height: 200,
    justifyContent: 'space-between',
  },
  actionsWrapper: {
    height: '100%',
    justifyContent: 'space-between',
  },
  bigTextGreen: {
    fontSize: 30,
    color: 'green',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  centerText: {
    textAlign: 'center',
  },
  serif: {
    fontFamily: 'serif',
  },
});

export const RunsInputStyles = StyleSheet.create({
  runBtn: {
    width: 40,
    margin: 5,
    borderRadius: 20,
  },
  runBtnText: {fontSize: 18},
  innerCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: '55%',
    height: 200,
  },
});

export const BallLogStyles = StyleSheet.create({
  ballLog: {
    height: 70,
  },
  ballContainer: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,

    justifyContent: 'center',
  },
  ballText: {
    fontSize: 20,
    color: '#444444',
    textAlign: 'center',
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
    width: 40,
  },
  nameItem: {
    width: 90,
  },
  rowItem: {
    width: 40,
  },
});

export default CommonStyles;
