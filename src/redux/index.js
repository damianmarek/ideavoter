import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from '../saga'

export default () => {
  const rootReducer = combineReducers({
    ideas: require('./ideasRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
