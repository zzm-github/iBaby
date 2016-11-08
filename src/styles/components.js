import { StyleSheet } from 'react-native';
import * as vars from './variables';
console.log(vars);
export const navbar = {
  backgroundColor: vars.colorPrimary
};

export const navbarTitle = {
  color: vars.colorTextLight,
};

export const navbarBtn = {
  color: vars.colorTextNormal,
  fontSize: 16,
  fontFamily: vars.defaultFontFamily,
  height: 45,
  lineHeight: 45,
  paddingHorizontal: 6,
  backgroundColor: 'transparent',
  minWidth: 50,
  textAlign: 'center'
};
