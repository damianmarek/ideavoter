import LoginActions, { LoginTypes } from '../redux/loginRedux'
import { takeEvery, put, take, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider()

export function * watchLoginAttempt() {
  yield takeEvery(LoginTypes.LOGIN_ATTEMPT, login)
}

function * login() {
  yield firebase.auth().signInWithRedirect(provider)
}

export function * watchLogoutAttempt() {
  yield takeEvery(LoginTypes.LOGOUT_ATTEMPT, logout)
}

function * logout() {
  yield firebase.auth().signOut()
}

function authChannel() {
  const auth = firebase.auth()
  const channel = eventChannel(emit => {
    const unsubscribe = auth.onAuthStateChanged(
      user => emit({ user }),
      error => emit({ error })
    )
    return unsubscribe
  })
  return channel
}

export function * listenAuth() {
  const channel = yield call(authChannel)
  while(true) {
    const { user } = yield take(channel);

    if (user)  yield put(LoginActions.loginSuccess(user.displayName, user.email));
    else yield put(LoginActions.logoutSuccess());
  }
}
