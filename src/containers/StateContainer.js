import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { queryTotal } from '../actions';
import { getStates, getBaby, getBabyAge, getStatesAsArray } from '../selectors';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import NavgationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import dateFormat from 'dateformat';

import Nabar from '../components/Navbar';
import Loading from '../components/Loading';
import RecordTypes, { getIconURL } from '../constants/RecordTypes';
import globalStyles from '../styles';
import styles from './StateContainer.style';

class StateContainer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.queryTotal(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    let states = this.props.states;
    return (
      <View style={styles.main}>
        <Nabar
          title='宝宝'
        />
        <View style={styles.mainHeader}>
          <Image source={require('../assets/babyboy.png')} style={styles.mainHeaderImage} />
          <Text style={styles.todayText}>{dateFormat(new Date(), 'mm月dd日')}</Text>
          <Text style={styles.ageText}>{this.props.age} 天</Text>
        </View>
        <View style={styles.mainState}>
          <ScrollView automaticallyAdjustContentInsets={false}>
            <View style={{height: 12}}/>
            {(() => {
              var rows = [];
              var row = [];
              states.forEach((item, idx) => {
                if(idx % 3 === 0) {
                  row.length > 0 && rows.push(<View key={Math.random()} style={styles.mainStateRow}>{row}</View>);
                  row = [];
                }
                row.push(
                  <View key={item.id} style={styles.mainStateItem}>
                    <Image style={styles.mainStateItemImage} source={getIconURL(item.id)} />
                    <Text style={styles.mainStateItemType}>{RecordTypes[item.id]}</Text>
                    <Text style={styles.mainStateItemText}>{item.value || 0}次</Text>
                  </View>
                );
              });
              if(row.length > 0) {
                if(row.length === 1) {
                  row.push(<View key={Math.random()} style={styles.mainStateItem}></View>);
                  row.push(<View key={Math.random()} style={styles.mainStateItem}></View>);
                } else {
                  row.push(<View key={Math.random()} style={styles.mainStateItem}></View>);
                }
                rows.push(<View key={Math.random()} style={styles.mainStateRow}>{row}</View>);
              }
              return rows;
            })()}

            <View style={{height: 60}}/>
          </ScrollView>
        </View>
        <Loading visible={this.state.loading} />
      </View>
    );
  }

}

export default connect((state) => {
  return {
    baby: getBaby(state),
    states: getStatesAsArray(state),
    age: getBabyAge(state),
  }
}, (dispatch) => {
  return {
    queryTotal: (cb) => dispatch(queryTotal(cb))
  }
})(StateContainer);
