import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class DeckInfo extends React.Component {
  render() {
    const { deck } = this.props
    const length = deck.questions.length
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        {
          length > 0 ?
            <Text style={styles.questionText}>{length} question{length > 1 ? 's' : ''}</Text> :
            null
        }

        {/*TODO style for buttons*/}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Quiz', { title: deck.title })}
          style={styles.quizButton}
        >
          <Text style={styles.quizText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddCard', { title: deck.title, type: 'edit' })}>
          <Text style={styles.editButton}>Add Card</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    alignItems: 'center'
  },
  title: {
    paddingTop: 30,
    fontSize: 40,
    color: 'red'
  },
  questionText: {
    fontSize: 25,
    margin: 25,
    color: 'gray'
  },
  quizText: {
    fontSize: 25,
    color: 'white'
  },
  editButton: {
    fontSize: 20,
    color: 'green'
  },
  quizButton: {
    alignItems: 'center',
    width: '80%',
    margin: 20,
    borderRadius: 3,
    backgroundColor: 'blue',
    padding: 10
  }
})

//TODO Styles
const mapStateToProps = (state, { navigation }) => ({
  deck: state[navigation.state.params.title]
})

export default connect(mapStateToProps)(DeckInfo)