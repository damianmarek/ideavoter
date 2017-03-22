import IdeasActions, { IdeasTypes } from '../redux/ideasRedux'
import { takeEvery, put } from 'redux-saga/effects'
import firebase from 'firebase'

export function * watchAddIdea() {
  yield takeEvery(IdeasTypes.ADD_IDEA, addIdea)
}

function * addIdea({ text, id }) {
  yield firebase.database().ref(`ideas/${id}`).set({
    id,
    text,
  })
}

export function * watchRemoveIdea() {
  yield takeEvery(IdeasTypes.REMOVE_IDEA, removeIdea)
}

function * removeIdea({ id }) {
  yield firebase.database().ref(`ideas/${id}`).remove()
}

export function * watchLoadIdeas() {
  yield takeEvery(IdeasTypes.LOAD_IDEAS_ATTEMPT, loadIdeasAttempt)
}

function * loadIdeasAttempt() {
  let snapshot = yield firebase.database().ref(`ideas/`).once('value')
  yield put(IdeasActions.loadIdeasSuccess(Object.values(snapshot.val() || {})))
}
