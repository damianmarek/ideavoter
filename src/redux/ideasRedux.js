import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  addIdea: ['text', 'id'],
  removeIdea: ['id'],
  loadIdeasAttempt: [''],
  loadIdeasSuccess: ['list'],
})

export const IdeasTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  list: []
})

export const addIdea = (state, action) =>
  state.setIn(['list'],
    [...state.list,
    {
      text: action.text,
      id: action.id
    }
  ])

export const removeIdea = (state, action) =>
  state.setIn(['list'], [...state.list].filter((obj) =>  obj.id !== action.id))

export const loadIdeasAttempt = (state, action) => state

export const loadIdeasSuccess = (state, action) => state.setIn(['list'], action.list)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_IDEA]: addIdea,
  [Types.REMOVE_IDEA]: removeIdea,
  [Types.LOAD_IDEAS_ATTEMPT]: loadIdeasAttempt,
  [Types.LOAD_IDEAS_SUCCESS]: loadIdeasSuccess,
})
