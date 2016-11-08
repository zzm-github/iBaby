import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';


export default class Loading extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { prepareVisible: props.visible };
    this.timer = null;
    if(this.state.prepareVisible) {
      this.resolveVisible();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ prepareVisible: nextProps.visible }, () => this.resolveVisible());
  }

  resolveVisible() {
    if(this.props.delay === false) {
      this.setState({ visible: this.state.prepareVisible });
      return;
    }
    if(!this.state.prepareVisible) {
      this.setState({ visible: false });
      return;
    }
    if(this.timer) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      if(this.state.prepareVisible) {
        this.setState({ visible: true });
      }
    }, 500);
  }

  render() {
    if(!this.state.visible) {
      return <View style={{ position: 'absolute', top: -1000, width: 0, height: 0 }} />
    }
    return (
      <View style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
        <ActivityIndicator animating={true} color={'white'}/>
      </View>
    );
  }

}
