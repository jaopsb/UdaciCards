import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'

class DeckInfo extends React.Component {
  render() {
    const { deck } = this.props
    const length = deck.questions.length
    return (
      <View>
        <Text>{deck.title}</Text>
        {
          length > 0 ?
            <Text>{length} question{length > 1 ? 's' : ''}</Text> :
            null
        }

        {/*TODO style for buttons*/}
        <TouchableOpacity>
          {/*TODO Navigate to QUIZ */}
          <Text>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {/*TODO Navigate to Edit/AddCard*/}
          <Text>Edit Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

//TODO Styles
const mapStateToProps = (state, { navigation }) => ({
  deck: state[navigation.state.params.title]
})

export default connect(mapStateToProps)(DeckInfo)