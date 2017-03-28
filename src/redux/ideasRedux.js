import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import R from 'ramda'

const { Types, Creators } = createActions({
  addIdeaAttempt: ['text', 'timestamp'],
  addIdeaSuccess: ['text', 'timestamp', 'key'],
  removeIdeaAttempt: ['key'],
  removeIdeaSuccess: ['key'],
  likeIdeaAttempt: ['key'],
  likeIdeaSuccess: ['key'],
  setIdeaLikes: ['key', 'value'],
  loadLikes: [],
})

export const IdeasTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  list: {}
})

export const addIdeaAttempt = (state, action) => state

export const addIdeaSuccess = (state, action) =>
  state.setIn(['list', action.key],
    {
      text: action.text,
      timestamp: action.timestamp,
      likes: 0,
    }
  )

export const removeIdeaAttempt = (state, action) => state

export const removeIdeaSuccess = (state, action) =>
  state.setIn(['list'], R.omit(action.key, state.list))

export const likeIdeaAttempt = (state, action) => state

export const likeIdeaSuccess = (state, action) =>
  state.setIn(['list', action.key, 'likes'], state.list[action.key].likes + 1)

export const setIdeaLikes = (state, action) =>
  state.setIn(['list', action.key, 'likes'], action.value)

export const loadLikes = (state, action) => state

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_IDEA_ATTEMPT]: addIdeaAttempt,
  [Types.ADD_IDEA_SUCCESS]: addIdeaSuccess,
  [Types.REMOVE_IDEA_ATTEMPT]: removeIdeaAttempt,
  [Types.REMOVE_IDEA_SUCCESS]: removeIdeaSuccess,
  [Types.LIKE_IDEA_ATTEMPT]: likeIdeaAttempt,
  [Types.LIKE_IDEA_SUCCESS]: likeIdeaSuccess,
  [Types.SET_IDEA_LIKES]: setIdeaLikes,
  [Types.LOAD_LIKES]: loadLikes,
})
