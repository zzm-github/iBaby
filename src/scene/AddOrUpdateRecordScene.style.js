import { StyleSheet } from 'react-native';
import globalStyles from '../styles';

export default StyleSheet.create({
  addRecordScene: {
    flex: 1,
    flexDirection: 'column',
  },
  formView: {
    flex: 1,
    backgroundColor: globalStyles.variables.colorBackground,
  },
  formViewContainer: {
    paddingBottom: 100,
    flexDirection: 'column',
  },
  formRow: {
    flexDirection: 'row',
    paddingRight: 20,
    paddingVertical: 10,
    marginLeft: 20,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.variables.colorTextNormal,
  },
  formLabel: {
    width: 130,
    height: 40,
    marginLeft: -10,
    textAlign: 'left',
    lineHeight: 36,
    fontSize: 18,
    fontFamily: globalStyles.variables.defaultFontFamily,
    color: globalStyles.variables.colorTextLightGray,
  },
  formField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addRecordBtn: {
    height: 48,
    backgroundColor: globalStyles.variables.colorLightGray,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 20,
  },
  addRecordBtnText: {
    textAlign: 'center',
    lineHeight: 48,
    color: 'white',
    fontSize: 18,
    fontFamily: globalStyles.variables.defaultFontFamily,
  }
});
