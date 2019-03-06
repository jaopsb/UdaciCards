import { AsyncStorage } from 'react-native'

export const FLASHCARD_KEY = 'FLASH_CARDS'

export const isObjectEmpty = (obj) => Object.entries(obj).length === 0 && obj.constructor === Object

const dummy = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export default {
  getDecks: () => (
    AsyncStorage.getItem(FLASHCARD_KEY)
      .then(JSON.parse)
      .then(data => data)
  ),
  addDeck: (deck) => (
    AsyncStorage.mergeItem(FLASHCARD_KEY, JSON.stringify(deck))
      .then(JSON.parse)
      .then(data => data)
  ),
  setDecks: (decks) => (
    AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(decks))
      .then(JSON.parse)
      .then(data => data)
  ),
  setInitialDummyDecks: () => (
    AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(dummy))
      .then(() => dummy)
  )
}