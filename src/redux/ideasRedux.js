import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  addIdea: []
})

export const IdeaTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  ideas: []
})

export const addIdea = (state, action) => state

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_IDEA]: addIdea,
})
