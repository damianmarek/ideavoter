import LoginActions, { LoginTypes } from '../redux/loginRedux'
import { takeEvery, put } from 'redux-saga/effects'
import firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider()

export function * watchLoginAttempt() {
  yield takeEvery(LoginTypes.LOGIN_ATTEMPT, login)
}

function * login() {
  let result = yield firebase.auth().signInWithPopup(provider)
  //console.log(result)
  if(result.user) yield put(LoginActions.loginSuccess(result.user.displayName, result.user.email))
}

export function * watchLogoutAttempt() {
  yield takeEvery(LoginTypes.LOGOUT_ATTEMPT, logout)
}

function * logout() {
  yield firebase.auth().signOut()
  yield put(LoginActions.logoutSuccess())
}
