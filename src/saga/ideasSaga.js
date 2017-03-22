import IdeasActions, { IdeasTypes } from '../redux/ideasRedux'
import { takeEvery, put, select } from 'redux-saga/effects'
import firebase from 'firebase'

const selectLogin = (state) => state.login.logged

export function * watchAddIdea() {
  yield takeEvery(IdeasTypes.ADD_IDEA_ATTEMPT, addIdea)
}

function * addIdea({ text, id }) {
  const logged = yield select(selectLogin)
  if(logged) {
    yield firebase.database().ref(`ideas/${id}`).set({
      id,
      text,
    })
    yield put(IdeasActions.addIdeaSuccess(text, id))
  }
}

export function * watchRemoveIdea() {
  yield takeEvery(IdeasTypes.REMOVE_IDEA_ATTEMPT, removeIdea)
}

function * removeIdea({ id }) {
  const logged = yield select(selectLogin)
  if(logged) {
    yield firebase.database().ref(`ideas/${id}`).remove()
    yield put(IdeasActions.removeIdeaSuccess(id))
  }
}

export function * watchLoadIdeas() {
  yield takeEvery(IdeasTypes.LOAD_IDEAS_ATTEMPT, loadIdeasAttempt)
}

function * loadIdeasAttempt() {
  let snapshot = yield firebase.database().ref(`ideas/`).once('value')
  yield put(IdeasActions.loadIdeasSuccess(Object.values(snapshot.val() || {})))
}
