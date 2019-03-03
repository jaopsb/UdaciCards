import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import Decks from '../components/Decks'

class DecksView extends React.Component {
  render() {
    const { decks } = this.props
    return (
      <View>
        {
          !decks ?
            <Text>There's no Decks!!!</Text> :
            <Decks decks={decks} />
        }
      </View>
    )
  }
}


const mapStateToProps = ({ decks }) => (
  decks
)
export default connect(mapStateToProps)(DecksView)