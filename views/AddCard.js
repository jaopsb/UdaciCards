import React from 'react'
import { Alert, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { handleAddDeck } from '../redux/actions';
import Questions from '../components/Questions';

const emptyNewQuestion = {
  id: '',
  question: '',
  answer: ''
}
const emptyDeck = {
  title: '',
  questions: []
}
class AddCard extends React.Component {
  state = {
    editting: false,
    title: '',
    questions: [],
    newQuestion: {}
  }

  componentWillReceiveProps(newProps) {
    const { title } = this.props.navigation.state.params
    const { deck } = newProps

    this.setState({ title, questions: deck.questions })
  }

  componentDidMount() {
    const { title } = this.props.navigation.state.params
    const { deck } = this.props

    this.setState({
      title,
      questions: deck.questions

    })
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
    const { type } = this.props

    if (questions.filter(quest => quest.question === newQuestion.question).length > 0 && type === 'create') {
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
          {
            text: 'Hell yeah', onPress: () => {

              newQuestion.id = uuid()

              this.setState(prevState => (
                {
                  ...prevState,
                  questions: [
                    ...prevState.questions,
                    newQuestion
                  ],
                  newQuestion: emptyNewQuestion
                }
              ))
            }
          },
          { text: 'nope', style: 'cancel' }
        ]
      )
    }
  }

  editQuestion = () => {
    const { newQuestion, editting, questions } = this.state

    Alert.alert(
      'Confirm Question',
      "Are you sure about that?",
      [
        {
          text: 'Hell yeah',
          onPress: () => {
            this.setState({
              questions: [
                ...questions.map(quest => (
                  quest.id === newQuestion.id ?
                    newQuestion :
                    quest
                ))
              ],
              newQuestion: emptyNewQuestion,
              editting: !editting,
            })
          }
        },
        { text: 'nope', style: 'cancel' }
      ]
    )
  }

  saveCard = () => {
    const { title, questions } = this.state
    const { addDeck, navigation } = this.props

    if (questions.length < 0)
      return Alert.alert(
        'No questions',
        "You Can't have a Decks of cards without question cards!!",
        [
          {
            text: 'OK', style: 'cancel'
          }
        ]
      )

    Alert.alert(
      'Create Deck',
      `Create the ${title} Deck?`,
      [
        {
          text: 'create',
          onPress: () => {

            addDeck({ title, questions })
            navigation.navigate("Home")
          }
        },
        {
          text: 'cancel', style: 'cancel'
        }
      ]
    )
  }

  cancelQuestion = () => {
    this.setState({ newQuestion: emptyNewQuestion, editting: false })
  }

  selectQuestion = (question) => {
    this.setState({ newQuestion: question, editting: true })
  }

  render() {
    const { questions, newQuestion, editting } = this.state

    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}> Add Cards</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder={`Question #${questions.length + 1}`}
          placeholderTextColor="gray"
          autoCapitalize="none"
          value={newQuestion.question}
          onChangeText={this.changeTitleQuestion}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          placeholderTextColor="gray"
          autoCapitalize="none"
          value={newQuestion.answer}
          onChangeText={this.changeAnswerQuestion}
        />
        {
          editting ?
            <View>
              <TouchableOpacity
                style={styles.submitContainer}
                onPress={this.editQuestion}>
                <Text style={{ color: "white" }}>Edit Question</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={this.cancelQuestion}>
                <Text style={{ color: "red", fontSize: 25 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
            :
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={this.addQuestion}>
              <Text style={{ color: "white" }}>Add Question</Text>
            </TouchableOpacity>
        }
        {
          questions.length > 0 ?
            <TouchableOpacity
              style={styles.saveCard}
              onPress={this.saveCard}>
              <Text style={{ color: 'white' }}>Save Cards</Text>
            </TouchableOpacity>
            :
            null
        }
        <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 20, color: '#f4511e', paddingBottom: 5 }}>Questions Already</Text>
        {
          questions.length > 0
            ?
            <Questions
              onSelect={this.selectQuestion}
              questions={questions} />
            :
            null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
    color: 'red',
    alignItems: 'center'
  },
  submitContainer: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10
  },
  cancelButton: {
    alignItems: 'center'
  },
  saveCard: {
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'green',
    fontSize: 20,
    margin: 5,
    padding: 10
  },
  input: {
    margin: 15,
    height: 40,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1
  }
})

const mapStateToProps = (state, { navigation }) => ({
  deck: state[navigation.state.params.title] ? state[navigation.state.params.title] : emptyDeck
})

const mapDispatchToProps = (dispatch) => ({
  addDeck: (deck) => dispatch(handleAddDeck(deck))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)