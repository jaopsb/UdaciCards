import { createStore } from 'redux'
import { AsyncStorage } from 'react-native'
import Reducer from './reducers'
import Middleware from './middleware'
import { FLASHCARD_KEY } from '../API'

const configureStore = () => {
  const store = createStore(Reducer, Middleware);
  return store;
};

export default configureStore;