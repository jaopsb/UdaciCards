import React from 'react'
import { ScrollView, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

class Questions extends React.Component {

  keyExtractor = (item, index) => item.question

  renderItem = ({ item }) => (
    <View key={item.question} style={styles.questionContainer}>
      <Text style={styles.questionText}>Q - {item.question}</Text>
      <Text style={styles.answerText}>A - {item.answer}</Text>
    </View>
  )

  render() {
    const { questions } = this.props
    return (
      <ScrollView style={styles.questionList}>
        <FlatList
          scrollEnabled={true}
          data={questions}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  questionList: {
    paddingTop: 20,
  },
  questionContainer: {
    padding: 10,
  },
  questionText: {
    fontSize: 18,
  },
  answerText: {
    fontSize: 14,
    color: 'gray'
  }
})

export default withNavigation(Questions)