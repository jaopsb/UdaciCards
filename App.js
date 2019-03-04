import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'

import Navigator from './Navigator'

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
      <View style={{ flex: 1 }}>
        <FlashStatusBar backgroundColor={'red'} />
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
