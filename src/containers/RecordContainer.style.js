import { StyleSheet } from 'react-native';
import globalStyles from '../styles';

export default StyleSheet.create({
  record: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: globalStyles.variables.colorBackground,
  },
  recordTypeView: {
    height: 48,
    flexDirection: 'column',
    backgroundColor: globalStyles.variables.colorBackgroundGray,
  },
  recordTypeScrollView: {
    flex: 1,
  },
  recordTypeScrollViewContainer: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  recordTypeLabelWrap: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordTypeLabelWrapSelected: {
    backgroundColor: globalStyles.variables.colorBackground,
  },
  recordTypeLabel: {
    color: globalStyles.variables.colorTextLightGray,
    fontFamily: globalStyles.variables.defaultFontFamily,
  },
  recordTypeLabelSelected: {
    color: globalStyles.variables.colorTextMid,
  },
  recordScrollView: {
    flex: 1,
    marginBottom: 50,
  },
  recordAddBtn: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: globalStyles.variables.colorBlue,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordAddBtnIcon: {
    color: 'white',
    flex: 1,
    fontSize: 20,
    backgroundColor: 'transparent',
    height: 44,
    width: 44,
    textAlign: 'center',
    lineHeight: 44,
  },
  recordWrap: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordTime: {
    width: 86,
    flexDirection: 'row',
    alignItems: 'center'
  },
  recordTimeIcon: {
    width: 24,
    fontSize: 12,
    textAlign: 'center',
    color: globalStyles.variables.colorTextGray,
  },
  recordLine: {
    position: 'absolute',
    borderLeftWidth: 2,
    borderColor: '#ddd',
    height: 80,
    top: 35,
    left: 23,
  },
  recordTimeContent: {
    flex: 1,
    height: 28,
    flexDirection: 'column',
    justifyContent: 'center',
    justifyContent: 'space-between',
  },
  recordStartTime: {
    fontFamily: globalStyles.variables.defaultFontFamily,
    fontSize: 12,
    color: globalStyles.variables.colorTextMid,
  },
  recordEndTime: {
    fontFamily: globalStyles.variables.defaultFontFamily,
    fontSize: 12,
    color: globalStyles.variables.colorTextMid,
  },
  recordContent: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flex: 1,
    borderRadius: 8,
    alignItems: 'center'
  },
  recordDetail: {
    flexDirection: 'column',
    flex: 1,
  },
  recordTypeImageWrap: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 4,
    marginRight: 14,
  },
  recordTypeImage: {
    width: 30,
    height: 30,
  },
  recordTitle: {
    fontFamily: globalStyles.variables.defaultFontFamily,
    color: globalStyles.variables.colorTextLight,
    fontSize: 14,
  },
  recordNote: {
    fontFamily: globalStyles.variables.defaultFontFamily,
    color: globalStyles.variables.colorTextLight,
    fontSize: 12,
    marginTop: 8,
  },
  recordTimeComputed: {
    backgroundColor: globalStyles.variables.colorTransparentInner,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  recordTimeComputedText: {
    fontFamily: globalStyles.variables.defaultFontFamily,
    color: globalStyles.variables.colorTextNormal,
    fontSize: 10,
  }
});
