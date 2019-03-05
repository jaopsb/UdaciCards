import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, AsyncStorage, TouchableOpacity } from 'react-native'
import Decks from '../components/Decks'
import { handleInitialData, handleAddDeck } from '../redux/actions';

class DecksView extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { decks } = this.props

    return (
      <View style={styles.container}>
        <Decks decks={decks} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  label: {
    fontSize: 20,
    color: 'blue'
  },
})

const mapStateToProps = (state) => ({
  decks: state
})

export default connect(mapStateToProps)(DecksView)