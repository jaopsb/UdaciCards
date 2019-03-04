import { createStore } from 'redux'
import { AsyncStorage } from 'react-native'
import Reducer from './reducers'
import Middleware from './middleware'
import { FLASHCARD_KEY } from '../API'

const configureStore = () => {
  const store = createStore(Reducer, Middleware);
  /*
    store.subscribe(() => {
      AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(store.getState()))
    })
  */
  return store;
};

export default configureStore;