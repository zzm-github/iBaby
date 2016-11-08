import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import NavgationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';

import globalStyles from '../styles';

export default class Navbar extends Component {

  static renderButton(props) {
    var icon = props.icon;
    if(props.back) {
      icon = icon || 'chevron-left';
    }
    if(icon) {
      return (
        <TouchableHighlight onPress={() => props.onPress()} underlayColor="transparent">
          <Text style={globalStyles.components.navbarBtn}><Icon name={icon} style={{fontSize: 16}}/>{props.title}</Text>
        </TouchableHighlight>
      );
    } else {
      return <TouchableHighlight underlayColor="transparent" onPress={() => props.onPress()}>
        <Text style={globalStyles.components.navbarBtn}>{props.title}</Text>
      </TouchableHighlight>;
    }
  }

  render() {

    if(this.props.leftButton) {
      this.props.leftButton.tintColor = globalStyles.components.navbarBtn.color;
    }
    if(this.props.rightButton) {
      this.props.rightButton.tintColor = globalStyles.components.navbarBtn.color;
    }

    return (
      <NavgationBar
        {...this.props}
        style={globalStyles.components.navbar}
        title={{
          title: this.props.title,
          style: {
            color: globalStyles.variables.colorTextLight,
            fontFamily: globalStyles.variables.defaultFontFamily,
            fontSize: 18,
          }
        }}
        statusBar={{
          style: 'light-content',
          tintColor: globalStyles.components.navbar.backgroundColor
        }}
      />
    );
  }

}
