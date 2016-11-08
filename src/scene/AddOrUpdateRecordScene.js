import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addRecord, updateRecord, deleteRecord } from '../actions';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Slider,
  TouchableHighlight,
  TextInput,
  AlertIOS,
  ActionSheetIOS,
} from 'react-native';
import NavgationBar from 'react-native-navbar';
import ModalPicker from 'react-native-modal-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import DatePicker from '../components/DatePicker';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import globalStyles from '../styles';
import styles, { datepickerStyle } from './AddOrUpdateRecordScene.style';
import RecordTypes, { mapRecordType } from '../constants/RecordTypes';

const recordTypeList = mapRecordType((id, name) => {
  return { key: id, label: name };
});

class AddOrUpdateRecordScene extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    record: PropTypes.object
  }

  constructor(props) {
    super(props);
    if(props.record) {
      this.state = {
        values: {
          _id: props.record._id,
          id: props.record.id,
          type: props.record.type,
          startTime: new Date(props.record.startTime),
          endTime: new Date(props.record.endTime),
          remark: props.record.remark,
          note: props.record.note,
        },
        update: true,
        loading: false
      };
    } else {
      this.state = {
        values: {
          type: 20,
          startTime: new Date(),
          endTime: new Date(),
          remark: null,
          note: null,
        },
        loading: false,
      };
    }
  }

  setValues(values) {
    this.setState({
      values: Object.assign(this.state.values, values)
    });
  }

  getValue(key) {
    return this.state.values[key];
  }

  setValueSilent(key, value) {
    this.state.values[key] = value;
  }

  _onClickAddBtn() {
    this.setState({ loading: true });

    let values = Object.assign(this.state.update ? {} : {
      id: Date.now() + '' + Math.random(),
    }, this.state.values);
    values.startTime = values.startTime.getTime();
    values.endTime = values.endTime.getTime();

    if(this.state.update) {
      this.props.updateRecord(values, () => {
        setTimeout(() => {
          this.setState({ loading: false });
          this.props.navigator.pop();
        }, 500);
      });
    } else {
      this.props.addRecord(values, () => {
        setTimeout(() => {
          this.setState({ loading: false });
          this.props.navigator.pop();
        }, 500);
      });
    }


  }

  _onClickDeleteBtn() {
    AlertIOS.alert(
      '提示',
      '确定要删除吗？',
      [{
        text: '取消'
      }, {
        text: '确定',
        onPress: () => {
          this.setState({ loading: true });
          this.props.deleteRecord(Object.assign({}, this.state.values), () => {
            setTimeout(() => {
              this.setState({ loading: false });
              this.props.navigator.pop();
            }, 500);
          });
        }
      }]
    );

  }

  _renderSlider(params) {
    let value = this.getValue(params.key) || params.initValue || params.min || 0;
    let min = params.min || 0;
    let max = params.max || 1;
    let step = params.step || 0.1;
    let renderValue = params.renderValue && params.renderValue(value) || value;
    this.setValueSilent(params.key, value);
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Slider
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          style={{flex: 1}}
          onValueChange={(value) => {
            let state = {};
            state[params.key] = value;
            this.setValues(state);
          }}
        />
        <Text style={{paddingRight: 10, paddingLeft: 10, textAlign: 'center',
          color: globalStyles.variables.colorTextMid,
          fontFamily: globalStyles.variables.defaultFontFamily}}>{renderValue}{params.unit}</Text>
      </View>
    );
  }

  _renderModalPicker(params) {
    let value = this.getValue(params.key) || params.initValue;
    let displayValue;
    this.setValueSilent(params.key, value);
    for(let i=0; i<params.items.length; i++) {
      let item = params.items[i];
      if(item.key == value) {
        displayValue = item.label;
      }
    }
    return (
      <TouchableHighlight
        onPress={() => {
          ActionSheetIOS.showActionSheetWithOptions({
            options: params.items.map((item) => item.label).concat(['取消']),
            cancelButtonIndex: params.items.length
          }, (buttonIndex) => {
            if(buttonIndex === params.items.length) return;
            let state = {};
            state[params.key] = params.items[buttonIndex].key;
            this.setValues(state);
            params.onChange && params.onChange(params.items[buttonIndex]);
          });
        }}
        style={{flex: 1}}
        underlayColor="transparent"
      >
        <TextInput
          style={{
            height: 40,
            borderWidth: 0,
            flex: 1,
            padding: 10,
            color: globalStyles.variables.colorTextMid,
            fontFamily: globalStyles.variables.defaultFontFamily,
          }}
          editable={false}
          value={displayValue}
        />
      </TouchableHighlight>
    )
  }

  _renderTextInput(params) {
    let value = this.getValue(params.key) || params.initValue;
    let placeholder = params.placeholder || '';
    this.setValueSilent(params.key, value);
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={{
            height: 40,
            borderWidth: 0,
            flex: 1,
            padding: 10,
            color: globalStyles.variables.colorTextMid,
            fontFamily: globalStyles.variables.defaultFontFamily,
          }}
          value={value ? (value + '') : ''}
          placeholder={placeholder}
          onChangeText={(text) => {
            let state = {};
            state[params.key] = text;
            this.setValues(state);
          }}
        />
      </View>
    );
  }

  _renderDatePicker(params) {
    let value = this.getValue(params.key) || params.initValue;
    let min = params.min || moment().subtract(1, 'd').toDate();
    let max = params.max || moment().add(1, 'd').toDate();
    this.setValueSilent(params.key, value);

    let ref = params.key + 'TextInput';
    let refDpk = params.key + 'DatePicker';
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableHighlight
          onPress={() => this.refs[refDpk].setState({ visible: true })}
          style={{flex: 1}}
          underlayColor="transparent"
        >
          <TextInput
            ref={ref}
            style={{height: 40, borderColor: 'gray',
              borderWidth: 0, borderRadius: 5, flex: 1, padding: 10,
              backgroundColor: '#FFFFFF',
              color: globalStyles.variables.colorTextMid,
              fontFamily: globalStyles.variables.defaultFontFamily,

            }}
            value={moment(value).format(params.format)}
            editable={false}
          />
        </TouchableHighlight>
        <DatePicker
          ref={refDpk}
          date={value}
          minDate={min}
          maxDate={max}
          mode={params.mode}
          visible={false}
          onDateChange={(date) => {
            let state = {};
            state[params.key] = date;
            this.setValues(state);
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.addRecordScene}>

        {(() => {
          if(this.state.update) {
            return <Navbar
              title={this.state.update ? '修改记录' : '添加记录'}
              leftButton={Navbar.renderButton({
                back: true,
                title: '返回',
                onPress: () => this.props.navigator.pop(),
              })}
              rightButton={Navbar.renderButton({
                title: '删除',
                onPress: () => this._onClickDeleteBtn(),
              })}
            />
          } else {
            return <Navbar
              title={this.state.update ? '修改记录' : '添加记录'}
              leftButton={Navbar.renderButton({
                back: true,
                title: '返回',
                onPress: () => this.props.navigator.pop(),
              })}
            />
          }
        })()}

        <ScrollView
          style={styles.formView}
          contentContainerStyle={styles.formViewContainer}
          automaticallyAdjustContentInsets={false}
        >
          <View style={styles.formRow}>
            <Text style={styles.formLabel}><Icon name="bookmark-o" style={{fontSize: 18}}/>  事件：</Text>
            <View style={styles.formField}>
              {this._renderModalPicker({
                key: 'type',
                items: recordTypeList,
                initValue: recordTypeList[1].key,
                onChange: () => {
                  this.setState({ remark: null });
                }
              })}
            </View>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}><Icon name="clock-o" style={{fontSize: 18}}/>  开始时间：</Text>
            <View style={styles.formField}>
              {this._renderDatePicker({
                key: 'startTime',
                format: "DD日 HH时mm分 "
              })}
            </View>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}><Icon name="clock-o" style={{fontSize: 18}}/>  结束时间：</Text>
            <View style={styles.formField}>
              {this._renderDatePicker({
                key: 'endTime',
                format: "DD日 HH时mm分 "
              })}
            </View>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}><Icon name="pencil" style={{fontSize: 18}}/>  记录：</Text>
            <View style={styles.formField}>
              {(() => {
                let type = parseInt(this.getValue('type'));
                switch(type) {
                  case 20:
                    return <Text
                      style={{
                        fontFamily: globalStyles.variables.defaultFontFamily,
                        color: globalStyles.variables.colorTextGray,
                        flex: 1,
                        paddingLeft: 10,
                        fontSize: 16,
                      }}>无需填写</Text>;
                  case 10:
                  case 30:
                    return this._renderSlider({
                      key: 'remark',
                      min: 0,
                      max: 300,
                      initValue: 60,
                      unit: '毫升',
                      step: 10,
                    });
                  case 40:
                    return this._renderModalPicker({
                      key: 'remark',
                      items: [
                        { key: '睡眠良好', label: '睡眠良好' },
                        { key: '睡眠一般', label: '睡眠一般' },
                        { key: '睡眠不良', label: '睡眠不良' }
                      ],
                      initValue: '睡眠良好'
                    });
                  case 50:
                  case 60:
                    return this._renderModalPicker({
                      key: 'remark',
                      items: [
                        { key: '量多', label: '量多' },
                        { key: '一般', label: '一般' },
                        { key: '量少', label: '量少' }
                      ],
                      initValue: '量多'
                    });
                  case 70:
                    return this._renderTextInput({
                      key: 'remark',
                      placeholder: '洗澡状态 (可不填)'
                    });
                  case 80:
                    return this._renderSlider({
                      key: 'remark',
                      min: 340,
                      max: 450,
                      initValue: 365,
                      unit: '℃',
                      step: 1,
                      renderValue: (value) => {
                        return value/10;
                      }
                    });
                  case 90:
                    return this._renderTextInput({
                      key: 'remark',
                      placeholder: '用药护理情况 (可不填)'
                    });
                  case 100:
                    return this._renderTextInput({
                      key: 'remark',
                      placeholder: '事件说明'
                    });
                }
              })()}
            </View>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.formLabel}><Icon name="sticky-note-o" style={{fontSize: 18}}/>  附加说明：</Text>
            <View style={styles.formField}>
              {this._renderTextInput({
                key: 'note',
                placeholder: '比如（左右胸)'
              })}
            </View>
          </View>

          <TouchableHighlight onPress={() => this._onClickAddBtn()} underlayColor="transparent">
            <View style={styles.addRecordBtn}>
              <Text style={styles.addRecordBtnText}>{this.state.update ? '修 改' : '添 加'}</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>


        <Loading visible={this.state.loading} delay={false} />
      </View>
    );
  }
}

export default connect((state) => {
  return {
  }
}, (dispatch) => {
  return {
    addRecord: (record, cb) => dispatch(addRecord(record, cb)),
    updateRecord: (record, cb) => dispatch(updateRecord(record, cb)),
    deleteRecord: (record, cb) => dispatch(deleteRecord(record, cb)),
  }
})(AddOrUpdateRecordScene);
