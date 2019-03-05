import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

class Decks extends React.Component {

  keyExtractor = (item, index) => item.title

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckInfo', { title: item.title })}>
      <View style={styles.deck}>
        <Text style={styles.item}>{item.title}</Text>
        <Text style={styles.questionsText}>{item.questions.length} question{item.questions.length > 1 ? 's' : ''}</Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    const { decks } = this.props
    return (
      <FlatList
        data={Object.keys(decks).map(key => decks[key])}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem} />
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    paddingTop: 20,
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  item: {
    fontSize: 50,
    color: 'black',
  },
  questionsText: {
    color: "gray"
  }
})

export default withNavigation(Decks)