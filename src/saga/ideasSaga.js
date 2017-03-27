import IdeasActions, { IdeasTypes } from '../redux/ideasRedux'
import { takeEvery, put, select, take, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import firebase from 'firebase'

const selectLogin = (state) => state.login

export function * watchAddIdea() {
  yield takeEvery(IdeasTypes.ADD_IDEA_ATTEMPT, addIdea)
}

function * addIdea({ text, timestamp }) {
  const loginState = yield select(selectLogin)
  const { uid } = loginState

  yield firebase.database().ref(`ideas`).push({
    timestamp,
    text,
    uid,
  })
  .catch((err) => {
    console.log(err)
  })
}

export function * watchRemoveIdea() {
  yield takeEvery(IdeasTypes.REMOVE_IDEA_ATTEMPT, removeIdea)
}

function * removeIdea({ key }) {
  const loginState = yield select(selectLogin)
  let snap = yield firebase.database().ref(`ideas/${key}`).once('value')
  if(snap.val().uid === loginState.uid)
    yield firebase.database().ref(`ideas/${key}`)
    .remove().catch((err) => {
      console.log(err)
    })
}

function addIdeaChannel() {
  const ref = firebase.database().ref('ideas')
  const channel = eventChannel(emit => {
    const callback = ref.on('child_added', snapshot => emit(snapshot))

    return () => ref.off(event, callback)
  })
  return channel
}

export function * listenAddIdeas() {
  const addChannel = yield call(addIdeaChannel)

  while(true) {
    const addIdea = yield take(addChannel)
    let { timestamp, text } = addIdea.val()
    yield put(IdeasActions.addIdeaSuccess(text, timestamp, addIdea.key))
  }
}

function removeIdeaChannel() {
  const ref = firebase.database().ref('ideas')
  const channel = eventChannel(emit => {
    const callback = ref.on('child_removed', snapshot => emit(snapshot))

    return () => ref.off(event, callback)
  })
  return channel
}

export function * listenRemoveIdeas() {
  const removeChannel = yield call(removeIdeaChannel)

  while(true) {
    const removeIdea = yield take(removeChannel)
    yield put(IdeasActions.removeIdeaSuccess(removeIdea.key))
  }
}
