import { isDev, isProd } from './env';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Image,
  ScrollView,
  NavigatorIOS,
} from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './src/reducers';
import { queryTotal } from './src/actions';

import MainScene from './src/scene/MainScene';

const middleware = [ thunk ];

if (true || isDev()) {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

export default class iBaby extends Component {

  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS
          ref="navigator"
          initialRoute={{
            component: MainScene,
            title: '',
            navigationBarHidden: true,
          }}
          style={{flex: 1}}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('iBaby', () => iBaby);
