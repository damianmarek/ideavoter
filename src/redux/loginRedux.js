import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  loginAttempt: [],
  loginSuccess: ['name', 'email', 'uid'],
  logoutAttempt: [],
  logoutSuccess: [],
})

export const LoginTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  logged: false,
  name: '',
  email: '',
  uid: '',
})

export const loginAttempt = (state, action) => state

export const loginSuccess = (state, action) => state.merge({
  logged: true,
  name: action.name,
  email: action.email,
  uid: action.uid,
 })

export const logoutAttempt = (state, action) => state

export const logoutSuccess = (state, action) => state.merge({ logged: false })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_ATTEMPT]: loginAttempt,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGOUT_ATTEMPT]: logoutAttempt,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
})
