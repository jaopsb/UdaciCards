import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import configureStore from './redux/store'
import Navigator from './Navigator'

const store = configureStore()

function FlashStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashStatusBar backgroundColor={'red'} />
          <Navigator />
        </View>
      </Provider>
    );
  }
}