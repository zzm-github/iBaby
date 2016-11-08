import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  DatePickerIOS,
  Modal,
} from 'react-native';
import globalStyles from '../styles';


export default class DatePicker extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      date: props.date,
      visible: props.visible,
      closed: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      date: props.date,
      visible: props.visible,
    });
  }

  close() {
    this.setState({
      visible: false,
      closed: true
    });
  }

  _onDateChange(date) {
    this.setState({
      date: date
    });
  }

  render() {
    if(!this.state.visible && this.state.closed) {
      return <View />
    }
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => this.close()}
        onShow={() => this.setState({ closed: false })}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              backgroundColor: globalStyles.variables.colorBackgroundGray,
            }}
          >
            <View style={{
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: '#ddd',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <TouchableHighlight onPress={() => this.setState({ visible: false })} underlayColor="transparent">
                <Text style={styles.buttonText}>取消</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setState({ visible: false }, () => this.props.onDateChange(this.state.date));
                }}
                underlayColor="transparent"
              >
                <Text style={styles.buttonText}>确定</Text>
              </TouchableHighlight>
            </View>
            <DatePickerIOS
              date={this.state.date}
              mode={this.props.mode}
              minimumDate={this.props.minDate}
              maximumDate={this.props.maxDate}
              onDateChange={(date) => this._onDateChange(date)}
            />
          </View>
        </View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: globalStyles.variables.colorTextMid,
    fontSize: 16,
    fontFamily: globalStyles.variables.defaultFontFamily,
  }
});
