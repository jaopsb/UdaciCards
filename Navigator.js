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
      title: "Create Deck",
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
        shadowOffset: {
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
      title: 'UdaciCards',
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
    path: 'DeckInfo/:title',
    screen: DeckInfo,
    navigationOptions: {
      title: 'Deck Info',
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
  AddCard: {
    path: 'AddCard/:title',
    screen: AddCard,
    title: 'Add Card',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
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
  Quiz: {
    screen: QuizView,
    title: 'Add Card',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}'s Quiz`,
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30
      },
    })
  }
})


export default createAppContainer(RootNavigator)