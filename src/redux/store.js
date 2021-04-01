import { createStore, combineReducers } from 'redux'
import tsjReducer from './tsjReducer'

const reducers = combineReducers({
  tsjReducer
})

const store = createStore(reducers)

export default store