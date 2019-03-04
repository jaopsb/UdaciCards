import API from "../../API";

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECKS'

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks
})

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck
})

export const handleInitialData = () => {
  return function (dispatch) {
    return API.setInitialDecks()
      .then(data => dispatch(receiveDecks(data)))
      .then(({ decks }) => decks)
  }
}

export const handleAddDeck = (deck) => {
  return function (dispatch) {
    return API.addDeck(deck)
      .then(() => dispatch(addDeck(deck)))
  }
}