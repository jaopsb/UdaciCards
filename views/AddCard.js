import React from 'react'
import { Alert, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleAddDeck } from '../redux/actions';
import Questions from '../components/Questions';

const emptyNewQuestion = {
  question: '',
  answer: ''
}

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
          {
            text: 'Hell yeah', onPress: () => {


              this.setState(prevState => (
                {
                  ...prevState,
                  questions: questions.concat(newQuestion),
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
              .then(() => navigation.navigate("Home"))
          }
        },
        {
          text: 'cancel', style: 'cancel'
        }
      ]
    )
  }

  render() {
    //const { newDeck } = this.props.navigation.state.params
    const { questions } = this.state

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
          onChangeText={this.changeTitleQuestion}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          placeholderTextColor="gray"
          autoCapitalize="none"
          value={this.state.newQuestion.answer}
          onChangeText={this.changeAnswerQuestion}
        />
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={this.addQuestion}
        >
          <Text style={{ color: "white" }}>Add Question</Text>
        </TouchableOpacity>

        {
          questions.length > 0 ?
            <TouchableOpacity
              style={styles.saveCard}
              onPress={this.saveCard}
            >
              <Text>Save Cards</Text>
            </TouchableOpacity>
            :
            null
        }
        <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 20, color: '#f4511e', paddingBottom: 5 }}>Questions Already</Text>
        {
          questions.length > 0 ?
            <Questions questions={questions} /> :
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
    borderColor: 'black',
    borderWidth: 1
  }
})

const mapStateToProps = (state) => ({
  decks: state
})

const mapDispatchToProps = (dispatch) => ({
  addDeck: (deck) => dispatch(handleAddDeck(deck))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)