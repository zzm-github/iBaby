import React, { Component, PropTypes } from 'react';
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

import AddOrUpdateRecordScene from './AddOrUpdateRecordScene';
import StateContainer from '../containers/StateContainer';
import RecordContainer from '../containers/RecordContainer';

import globalStyles from '../styles';
import styles from './MainScene.style';

export default class MainScene extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: 'baby'
    };
  }

  componentDidMount() {

  }

  _onTabBarItemPress(itemName) {
    this.setState({ selectedTab: itemName });
  }

  _onClickAddRecordBtn() {
    this.props.navigator.push({
      component: AddOrUpdateRecordScene,
      navigationBarHidden: true,
      title: ''
    });
  }

  _onPressRecordItem(record) {
    this.props.navigator.push({
      component: AddOrUpdateRecordScene,
      navigationBarHidden: true,
      title: '',
      passProps: { record: record },
      renderScene: (route, navigator) => {
        let Component = route.component;
        return <Component {...route.params} navigator={navigator} />
      }
    });
  }

  render() {
    return (
      <TabBarIOS
        barTintColor={globalStyles.variables.colorBackgroundGray}
        tintColor={globalStyles.variables.colorActive}
        unselectedTintColor={globalStyles.variables.colorInactive}
      >
        <Icon.TabBarItemIOS
          title="宝宝"
          iconName="user"
          selected={this.state.selectedTab == 'baby'}
          onPress={() => this._onTabBarItemPress('baby')}
          iconSize={28}
        >
          <StateContainer />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="记录"
          iconName="tasks"
          selected={this.state.selectedTab == 'record'}
          onPress={() => this._onTabBarItemPress("record")}
          iconSize={28}
        >
          <RecordContainer
            onClickAddBtn={() => this._onClickAddRecordBtn()}
            _onPressRecordItem={(record) => this._onPressRecordItem(record)}
          />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }

}

AppRegistry.registerComponent('MainScene', () => MainScene);
