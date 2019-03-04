import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class AddCard extends React.Component {
  render() {
    const { newDeck } = this.props.navigation.state.params
    return (
      <View>
        <Text>Add Card</Text>
        <Text>It's a New Deck? {newDeck ? "YES" : "NO"}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  decks: state
})

export default connect(mapStateToProps)(AddCard)