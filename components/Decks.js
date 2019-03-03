import React from 'react'
import { View, Text, FlatList } from 'react-native'


class Decks extends React.Component {

  keyExtractor = (item, index) => item.title

  renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
    </View>
  )

  render() {
    const { decks } = this.props
    return (
      <FlatList
        data={Object.keys(decks)}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem} />
    )
  }
}

export default Decks