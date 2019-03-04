import React from 'react'
import { Alert, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class AddCard extends React.Component {
  state = {
    title: '',
    questions: [],
    newQuestion: {}
  }
  componentDidMount() {
    const { title } = this.props.navigation.state.params

    this.setState({ title })
  }

  changeTitleQuestion = (text) => {
    const { newQuestion } = this.state

    this.setState({ newQuestion: { ...newQuestion, question: text } })
  }

  changeAnswerQuestion = (text) => {
    const { newQuestion } = this.state

    this.setState({
      newQuestion: {
        ...newQuestion,
        answer: text
      }
    })
  }

  addQuestion = () => {
    const { newQuestion, questions } = this.state

    if (questions.filter(quest => quest.question === newQuestion.question).length > 0) {
      Alert.alert(
        'OHH SNAP!',
        "There's already a question like this one!!",
        [
          { text: 'sorry', style: 'cancel' }
        ]
      )
    } else {
      Alert.alert(
        'Confirm Question',
        "Are you sure about that?",
        [
          { text: 'Hell yeah', onPress: () => { this.setState(prevState => ({ ...prevState, questions: questions.concat(newQuestion), newQuestion: {} })) } },
          { text: 'nope', style: 'cancel' }
        ]
      )
    }


  }

  render() {
    const { newDeck } = this.props.navigation.state.params
    const { questions, newQuestion } = this.state
    console.log('question', newQuestion)
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder={`Question #${questions.length + 1}`}
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={this.changeTitleQuestion}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={this.changeAnswerQuestion}
        />
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={this.addQuestion}
        >
          <Text style={styles.submitText}>Add Question</Text>
        </TouchableOpacity>

        {
          questions.length > 0 ?
            <View>
              <Text>Questions Already</Text>
              {
                questions.map(question => (
                  <View key={question.question}>
                    <Text>Question - {question.question}</Text>
                    <Text>Answer   - {question.answer}</Text>
                  </View>
                ))
              }
            </View>
            :
            null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  submitContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    color: 'white',
    fontSize: 30,
    borderWidth: 1,
    backgroundColor: 'green'
  },
  input: {
    margin: 20,
    height: 40,
    borderColor: 'black',
    borderWidth: 1
  },
})

const mapStateToProps = (state) => ({
  decks: state
})

export default connect(mapStateToProps)(AddCard)