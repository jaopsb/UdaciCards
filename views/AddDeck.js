import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const TITLE = 'TITLE'
const QUESTIONS = 'QUESTIONS'

class AddDeck extends React.Component {
  state = {
    title: '',
  }

  handleTitle = (text) => {
    this.setState({ title: text })
  }

  handleContinue = (title) => {
    const { navigation, decks } = this.props

    if (!decks[title]) {
      Alert.alert(
        'Confirm Title',
        `Confirm ${title} as the title of the New Deck?`,
        [
          { text: 'Confirm', onPress: () => navigation.navigate('AddCard', { title, newDeck: true }) },
          { text: 'Cancel', style: 'cancel' }

        ],
        { cancelable: false },
      );
    } else {
      alert('This title already exists!')
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create a New Deck</Text>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Deck's Title"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={this.handleTitle} />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => this.handleContinue(this.state.title)
          }>
          <Text style={styles.submitButtonText}> Continue </Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  title: {
    width: '100%',
    fontSize: 30,
    justifyContent: 'center'
  },
  input: {
    margin: 20,
    height: 40,
    borderColor: 'black',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  }
})

const mapStateToProps = (state) => ({
  decks: state
})

export default connect(mapStateToProps)(AddDeck) 