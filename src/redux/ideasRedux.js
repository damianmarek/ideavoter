import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  addIdeaAttempt: ['text', 'timestamp'],
  addIdeaSuccess: ['text', 'timestamp', 'key'],
  removeIdeaAttempt: ['key'],
  removeIdeaSuccess: ['key'],
})

export const IdeasTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  list: []
})

export const addIdeaAttempt = (state, action) => state

export const addIdeaSuccess = (state, action) =>
  state.setIn(['list'],
    [...state.list,
    {
      text: action.text,
      timestamp: action.timestamp,
      key: action.key,
    }
  ])

export const removeIdeaAttempt = (state, action) => state

export const removeIdeaSuccess = (state, action) =>
  state.setIn(['list'], [...state.list].filter((obj) =>  obj.key !== action.key))

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_IDEA_ATTEMPT]: addIdeaAttempt,
  [Types.ADD_IDEA_SUCCESS]: addIdeaSuccess,
  [Types.REMOVE_IDEA_ATTEMPT]: removeIdeaAttempt,
  [Types.REMOVE_IDEA_SUCCESS]: removeIdeaSuccess,
})
