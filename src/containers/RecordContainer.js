import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setSelectRecordType, queryRecordList } from '../actions';
import { getBaby, getStatesAsArray, getRecordList, getRecordListByType } from '../selectors';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  RecyclerViewBackedScrollView,
  ListView,
  TouchableHighlight,
} from 'react-native';
import NavgationBar from 'react-native-navbar';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import { isCommonDate } from '../utils';
import Navbar from '../components/Navbar';
import DatePicker from '../components/DatePicker';
import Loading from '../components/Loading';
import RecordTypes, {ALL, mapRecordType, getDisplayRemark, getIconURL} from '../constants/RecordTypes';
import globalStyles from '../styles';
import styles from './RecordContainer.style';


class RecordContainer extends Component {

  constructor(props, context) {
    super(props, context);
    this.queryId = 1;
    this.listDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      date: new Date(),
      loading: false,
      datepickerVisible: false
    };
  }

  componentDidMount() {
    this.queryRecordList(false, true);
  }

  queryRecordList(refreshing, loading) {
    let queryId = ++this.queryId;
    if(refreshing) {
      this.setState({ refreshing: true });
    }
    if(loading) {
      this.setState({ loading: true });
    }
    this.props.queryRecordList({
      date: this.state.date,
    }, () => {
      if(queryId !== this.queryId) return;
      refreshing && this.setState({
        refreshing: false
      });
      loading && this.setState({
        loading: false
      });
    });
  }

  _isSelectAll() {
    return this.props.selectedRecordType === ALL;
  }

  _getLabelAllStyles() {
    return this._isSelectAll() ? [styles.recordTypeLabel, styles.recordTypeLabelSelected] : styles.recordTypeLabel;
  }

  _getLabelStyles(id) {
    return this.props.selectedRecordType === id ? [styles.recordTypeLabel, styles.recordTypeLabelSelected] : styles.recordTypeLabel;
  }

  _getLabelAllWrapStyles() {
    return this._isSelectAll() ? [styles.recordTypeLabelWrap, styles.recordTypeLabelWrapSelected] : styles.recordTypeLabelWrap;
  }

  _getLabelWrapStyles(id) {
    return this.props.selectedRecordType === id ? [styles.recordTypeLabelWrap, styles.recordTypeLabelWrapSelected] : styles.recordTypeLabelWrap;
  }

  _select(id) {
    this.props.setSelectRecordType(id);
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.queryRecordList(true);
    }, 1000);
  }

  _onDateChange(date) {
    date.setHours(12);
    date.setMinutes(0);
    date.setSeconds(0);
    if(date.getTime() === this.state.date.getTime()) return;
    this.setState({
      date: date
    }, () => {
      setTimeout(() => this.queryRecordList(false, true), 10);
    });
  }

  _renderRow(record, sectionID, rowID, highlightRow) {
    let contentBg;
    switch(parseInt(record.type)) {
      case 10:
      case 20:
      case 30:
        contentBg = globalStyles.variables.colorLightGray; break;
      case 40:
        contentBg = globalStyles.variables.colorMidGreen; break;
      case 50:
      case 60:
        contentBg = globalStyles.variables.colorLight; break;
      case 70:
        contentBg = globalStyles.variables.colorLightBlue; break;
      default:
        contentBg = globalStyles.variables.colorBlue; break;
        break;

    }

    var line;
    var idx = this.props.recordList.indexOf(record);
    if(idx !== this.props.recordList.length - 1) {
      line = <View style={styles.recordLine}/>;
    }

    return (
      <TouchableHighlight onPress={() => this.props._onPressRecordItem(record)} underlayColor={globalStyles.variables.colorBackgroundGray}>
        <View style={styles.recordWrap}>
          {line}
          <View style={styles.recordTime}>
            <Icon name="circle" style={styles.recordTimeIcon}/>
            <View style={[styles.recordTimeContent]}>
              <Text style={styles.recordStartTime}>{this._formatTime(record.startTime)}</Text>
              <Text style={styles.recordEndTime}>{this._formatTime(record.endTime)}</Text>
            </View>
          </View>
          <View style={[styles.recordContent, {backgroundColor: contentBg}]}>
            <View style={styles.recordTypeImageWrap}>
              <Image style={styles.recordTypeImage} source={getIconURL(record.type)}/>
            </View>
            <View style={styles.recordDetail}>
              <Text style={styles.recordTitle}>{RecordTypes[record.type]} {getDisplayRemark(record)}</Text>
              <Text style={styles.recordNote}>
                {record.note || '无附加说明'}
              </Text>
            </View>
            <View style={styles.recordTimeComputed}>
              <Text style={styles.recordTimeComputedText}>{this._formatComputedTime(record.endTime-record.startTime)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _formatComputedTime(time) {
    var minute = Math.floor(time / 60000);
    var hour;
    if(minute > 60) {
      hour = Math.floor(minute / 60);
      minute = Math.floor(minute % 60);
    }
    if(hour) {
      if(minute) {
        return hour + '小时' + minute + '分';
      } else {
        return hour + '小时整';
      }
    } else {
      return minute + '分钟';
    }
  }

  _formatTime(time) {
    var date = new Date(time);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if(hours < 10) {
      hours = '0' + hours;
    }
    if(minutes < 10) {
      minutes = '0' + minutes;
    }
    return hours + ':' + minutes;
  }

  _getDisplayMonthDay(date) {
    if(isCommonDate(new Date(), date)) {
      return '今天';
    }
    return moment(date).format('MM月DD日');
  }
  /// <Text style={this._getLabelStyles(id)}>{name}</Text>
  _renderFilters() {
    return <View style={styles.recordTypeView}>
      <ScrollView
        horizontal={true}
        style={styles.recordTypeScrollView}
        contentContainerStyle={styles.recordTypeScrollViewContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
      >
        <TouchableHighlight onPress={() => this._select(0)} style={this._getLabelAllWrapStyles()} underlayColor="transparent">
            <Text style={this._getLabelAllStyles()}>全部</Text>
        </TouchableHighlight>
        {mapRecordType((id, name) => {
          return (
            <TouchableHighlight key={id} onPress={() => this._select(id)} style={this._getLabelWrapStyles(id)} underlayColor="transparent">
                <Image source={getIconURL(id)} style={{width:20, height:20}} />
            </TouchableHighlight>
          )
        })}
      </ScrollView>
    </View>
  }

  render() {
    let listDataSource = this.listDataSource = this.listDataSource.cloneWithRows(this.props.recordList);
    let date = this.state.date;
    return (
      <View style={styles.record}>
        <Navbar
          title='记录'
          leftButton={Navbar.renderButton({
            title: this._getDisplayMonthDay(date),
            onPress: () => {
              this.refs.datePicker.setState({ visible: true });
            }
          })}
          rightButton={Navbar.renderButton({
            title: ' ',
            icon: 'plus',
            onPress: () => this.props.onClickAddBtn()
          })}
        />
        {this._renderFilters()}
        <ListView
          style={styles.recordScrollView}
          automaticallyAdjustContentInsets={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
          enableEmptySections={true}
          dataSource={listDataSource}
          renderRow={this._renderRow.bind(this)}
          renderHeader={() => <View style={{height: 8 }}/>}
          renderFooter={() => <View style={{height: 10}}/>}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        />

        <DatePicker
          ref="datePicker"
          date={date}
          mode='date'
          minDate={this.props.baby.birthday}
          maxDate={new Date()}
          visible={false}
          onDateChange={(date) => {
            console.log('onchange', this.state.date, date);
            this._onDateChange(date);
          }}
        />

        <Loading visible={this.state.loading} />
      </View>
    );
  }

}



export default connect((state) => {
  return {
    baby: getBaby(state),
    states: getStatesAsArray(state),
    selectedRecordType: state.main.selectedRecordType,
    recordList: getRecordListByType(state),
  }
}, (dispatch) => {
  return {
    setSelectRecordType: (id) => dispatch(setSelectRecordType(id)),
    queryRecordList: (id, cb) => dispatch(queryRecordList(id, cb)),
  }
})(RecordContainer);
