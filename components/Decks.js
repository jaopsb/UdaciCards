import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

class Decks extends React.Component {

  keyExtractor = (item, index) => item.title

  renderItem = ({ item }) => (
    <View style={styles.deck}>
      <Text style={styles.item}>{item.title}</Text>
      <TouchableOpacity>
        <Text>Info</Text>
      </TouchableOpacity>
    </View>
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
    paddingVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  item: {
    fontSize: 50,
    color: 'black',
  }
})

export default Decks