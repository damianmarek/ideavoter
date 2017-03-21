import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  addIdea: ['text']
})

export const IdeasTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  list: []
})

export const addIdea = (state, action) =>
  state.setIn(['list'], [...state.list, action.text])

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_IDEA]: addIdea,
})
