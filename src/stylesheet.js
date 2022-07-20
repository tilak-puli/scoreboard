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
  centerPage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '90%',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBottom: {
    alignItems: 'flex-end',
    textAlignVertical: 'bottom',
  },
  horizontalWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
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
  line: {
    fontSize: 20,
    margin: 5,
    borderRightWidth: 1.5,
  },
  greySmallText: {
    fontSize: 15,
    color: '#666',
  },
  bigText: {
    fontSize: 40,
  },
  mediumText: {
    fontSize: 20,
  },
});

export const RunsInputStyles = StyleSheet.create({
  runBtn: {
    width: 45,
    margin: 5,
    borderRadius: 28,
    borderColor: '#153e75',
    borderWidth: 1.3,
  },
  runBtnText: {fontSize: 18, color: '#153e75'},
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
    marginLeft: 5,
    marginRight: 5,

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
    paddingTop: 3,
    paddingBottom: 3,
  },
  headerRow: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    backgroundColor: 'rgba(20,47,84,0.82)',

    padding: 5,
    borderRadius: 1,
  },
  rowItemFade: {
    color: 'white',
    padding: 5,
    width: 40,
  },
  nameItem: {
    width: 90,
    padding: 3,
    paddingBottom: 1,
  },
  rowItem: {
    padding: 3,

    width: 40,
  },
});

export default CommonStyles;
