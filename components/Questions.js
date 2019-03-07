import React from 'react'
import { ScrollView, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

class Questions extends React.Component {

  keyExtractor = (item, index) => item.id

  renderItem = (item, onSelect) => (
    <View key={item.question} style={styles.questionContainer}>
      <Text style={styles.questionText}>Q - {item.question}</Text>
      <Text style={styles.answerText}>A - {item.answer}</Text>
      <TouchableOpacity
        onPress={() => onSelect(item)}
        style={styles.editButton}>
        <FontAwesome name='edit' size={30} color='black' />
      </TouchableOpacity>
    </View>
  )

  render() {
    const { onSelect, questions } = this.props

    return (
      <ScrollView style={styles.questionList}>
        <FlatList
          scrollEnabled={true}
          data={questions}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => this.renderItem(item, onSelect)} />
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
  },
  editButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default withNavigation(Questions)