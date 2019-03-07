import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, AsyncStorage, TouchableOpacity } from 'react-native'
import Decks from '../components/Decks'
import { handleInitialData, handleAddDeck, handleInitialDataDummy } from '../redux/actions';
import { isObjectEmpty } from '../API';

class DecksView extends React.Component {

  componentDidMount() {
    ///Dispatch dummy content
    //this.props.dispatch(handleInitialDataDummy())

    this.props.dispatch(handleInitialData())
  }

  render() {
    const { decks } = this.props
    return (
      <View>
        {
          isObjectEmpty(decks) ?
            <View style={styles.container}>
              <Text style={styles.textNoDecksTitle}>There's no Decks!</Text>
              <Text style={styles.textNoDecksSubTItle}>Swipe right to create a new deck</Text>
            </View> :
            <Decks decks={decks} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textNoDecksTitle: {
    fontSize: 30,
    color: 'red'
  },
  textNoDecksSubTItle: {
    fontSize: 20,
    color: 'red'
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