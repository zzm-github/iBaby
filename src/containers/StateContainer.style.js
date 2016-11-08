import { StyleSheet } from 'react-native';
import globalStyles from '../styles';

export default StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  mainHeader: {
    paddingTop: 20,
    height: 170,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: globalStyles.variables.colorSecondary,
  },
  mainHeaderImage: {
    marginBottom: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: globalStyles.variables.colorTextLight,
    backgroundColor: 'white'
  },
  todayText: {
    color: globalStyles.variables.colorTextLight,
    fontFamily: globalStyles.variables.defaultFontFamily,
  },
  ageText: {
    marginTop: 5,
    color: globalStyles.variables.colorTextLight,
    fontSize: 16,
    fontFamily: globalStyles.variables.defaultFontFamily,
  },
  mainState: {
    flex: 1,
    backgroundColor: globalStyles.variables.colorBackground,
  },
  mainStateRow: {
    height: 100,
    flexDirection: 'row',
    marginBottom: 12,
  },
  mainStateItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainStateItemImage: {
    width: 60,
    height: 60,
  },
  mainStateItemType: {
    marginTop: 5,
    color: globalStyles.variables.colorTextMid,
    fontFamily: globalStyles.variables.defaultFontFamily,
  },
  mainStateItemText: {
    marginTop: 5,
    color: globalStyles.variables.colorTextGray,
    fontFamily: globalStyles.variables.defaultFontFamily,
  },
});
