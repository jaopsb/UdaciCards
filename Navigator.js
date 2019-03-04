import React from 'react'
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import DecksView from './views/DecksView'
import AddDeck from './views/AddDeck'
import DeckInfo from './views/DeckInfo'
import AddCard from './views/AddCard'
import QuizView from './views/QuizView'

const Tab = createBottomTabNavigator({
  Decks: {
    screen: DecksView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square-o' size={30} color={tintColor} />
    }
  }
}, {
    tabBarOptions: {
      activeTintColor: 'red',
      style: {
        height: 50,
        backgroundColor: 'white',
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset
          : {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1

      }
    }
  })

const RootNavigator = createStackNavigator({
  Home: {
    screen: Tab,
    navigationOptions: {
      title: 'Decks',
      headerStyle: {
        backgroundColor: '#f4511e',

      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 40
      },
    }
  },
  DeckInfo: {
    path: 'Deck/:title',
    screen: DeckInfo,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.params.title}'s Deck`,
      headerStyle: {
        backgroundColor: '#f4511e',

      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 40
      },
    })
  },
  AddCard: {
    screen: AddCard,
    path: 'addCard/:title',
    title: 'Add Card',
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerBackTitle: null
    }
  },
  Quiz: {
    screen: QuizView,
    title: 'Add Card',
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerBackTitle: null
    }
  }
})


export default createAppContainer(RootNavigator)