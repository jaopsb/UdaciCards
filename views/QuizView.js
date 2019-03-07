import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'

class QuizView extends React.Component {
  state = {
    toggle: false,
    deck: {},
    questions: [],
    currentQuestionNumber: 0,
    guessClicked: false,
    rights: 0,
    incorrects: 0
  }

  componentDidMount() {
    const { deck } = this.props
    this.setState({ deck, questions: deck.questions })
  }

  guessRight = () => {
    const { rights, guessClicked } = this.state
    if (!guessClicked)
      this.setState({ rights: rights + 1, guessClicked: true })
  }

  guessincorrect = () => {
    const { incorrects, guessClicked } = this.state
    if (!guessClicked)
      this.setState({ incorrects: incorrects + 1, guessClicked: true })
  }

  endQuiz = () => {
    const { rights, incorrects } = this.state
    const { navigation } = this.props

    Alert.alert(
      'End Quiz',
      `You Finished the Quiz!!
      You scored a total of ${rights} rights questions and ${incorrects} incorrect questions`,
      [
        {
          text: 'UHUULL'
        }
      ]
    )
    navigation.navigate('Home')
  }

  nextQuestion = () => {
    const { currentQuestionNumber, toggle, questions } = this.state

    if (currentQuestionNumber !== questions.length)
      this.setState({
        currentQuestionNumber: currentQuestionNumber + 1,
        toggle: toggle ? !toggle : toggle,
        guessClicked: false
      })
  }

  restartQuiz = () => {

    this.setState({
      currentQuestionNumber: 0,
      toggle: false,
      rights: 0,
      wrongs: 0
    })
  }

  render() {
    const { deck, questions, toggle, currentQuestionNumber } = this.state
    const { navigation } = this.props
    let currentQuestion = questions[currentQuestionNumber]

    return (
      Object.keys(deck).length > 0 ?
        <View>
          <Text styl={styles.counter}>{currentQuestionNumber + 1}/{deck.questions.length}</Text>
          <View style={styles.container}>
            <Text style={styles.quizTitle}>{currentQuestion.question}</Text>
            {
              !toggle
                ?
                <TouchableOpacity
                  style={styles.showAnswer}
                  onPress={() => this.setState({ toggle: !toggle })}>
                  <Text style={styles.showAnswerText}>Show Answer</Text>
                </TouchableOpacity>
                :
                <View style={styles.showAnswerContainer}>
                  <Text style={styles.answer}>{currentQuestion.answer}</Text>
                </View>
            }
            <View style={styles.correctincorrectContainer}>
              <TouchableOpacity
                style={styles.correctButton}
                onPress={this.guessRight}>
                <Text style={styles.correctText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.incorrectButton}
                onPress={this.guessincorrect}>
                <Text style={styles.incorrectText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
            {
              questions.length === currentQuestionNumber + 1 ?
                <TouchableOpacity
                  onPress={this.endQuiz}>
                  <Text
                    style={styles.nextButton}>
                    End Quiz</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={this.nextQuestion}>
                  <Text
                    style={styles.nextButton}>
                    Next Question</Text>
                </TouchableOpacity>
            }
          </View>
          <View
            style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={this.restartQuiz}>
              <Text style={styles.restartText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Decks')}>
              <Text style={styles.backDecksText}>Back to Decks</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View>
          <Text>Loading Deck</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: 'center'
  },
  quizTitle: {
    fontSize: 40,
    color: 'red'
  },
  answer: {
    fontSize: 28,
    color: '#0099ff'//blue
  },
  nextButton: {
    paddingTop: 20,
    paddingBottom: 5,
    fontSize: 25,
    color: 'blue'
  },
  counter: {
    fontSize: 30,
    justifyContent: 'flex-start'
  },
  showAnswerContainer: {
    justifyContent: 'center'
  },
  showAnswer: {
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#0099ff',//blue
    backgroundColor: '#80ccff'//light-blue
  },
  showAnswerText: {
    fontSize: 20,
    color: '#f2f2f2'//white
  },
  correctButton: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    borderColor: '#33cc33',//green
    backgroundColor: '#85e085',//light-green
    justifyContent: 'flex-start',
    borderWidth: 1
  },
  correctText: {
    fontSize: 18,
    color: '#f2f2f2'//white
  },
  incorrectText: {
    fontSize: 18,
    color: '#f2f2f2',//white
  },
  incorrectButton: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ff0000',//red
    backgroundColor: '#ff8080',//light-red
    justifyContent: 'flex-end',
    borderWidth: 1
  },
  correctincorrectContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10
  },
  bottomContainer: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  restartText: {
    padding: 5,
    color: '#0099ff',
    justifyContent: 'flex-start',
    fontSize: 15
  },
  backDecksText: {
    padding: 5,
    color: '#0099ff',
    justifyContent: 'flex-end',
    fontSize: 15
  }
})

const mapStateToProps = (state, { navigation }) => ({
  deck: state[navigation.state.params.title]
})

export default connect(mapStateToProps)(QuizView)