import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'

const TITLE = 'TITLE'
const QUESTIONS = 'QUESTIONS'

class AddDeck extends React.Component {
  state = {
    title: '',
    questions: []
  }

  handleOnChangeTitle = (event) => {
    console.log(event.title)
  }

  render() {
    console.log(this.state)
    return (
      <View style={{ flex: 1 }}>
        <Text>Add Deck</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChange={this.handleOnChangeTitle}
          placeholder="Decks's title"
          value={this.state.title}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  decks: state
})

export default connect(mapStateToProps)(AddDeck) 