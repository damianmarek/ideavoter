import IdeasActions, { IdeasTypes } from '../redux/ideasRedux'
import { takeEvery, put, select, take, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
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
  }
}

export function * watchRemoveIdea() {
  yield takeEvery(IdeasTypes.REMOVE_IDEA_ATTEMPT, removeIdea)
}

function * removeIdea({ id }) {
  const logged = yield select(selectLogin)
  if(logged) {
    yield firebase.database().ref(`ideas/${id}`).remove()
  }
}

function addIdeaChannel() {
  const ref = firebase.database().ref('ideas')
  const channel = eventChannel(emit => {
    const callback = ref.on('child_added', snapshot => emit(snapshot.val()))

    return () => ref.off(event, callback)
  })
  return channel
}

export function * listenAddIdeas() {
  const addChannel = yield call(addIdeaChannel)

  while(true) {
    const addIdea = yield take(addChannel)
    let { id, text } = addIdea
    yield put(IdeasActions.addIdeaSuccess(text, id))
  }
}

function removeIdeaChannel() {
  const ref = firebase.database().ref('ideas')
  const channel = eventChannel(emit => {
    const callback = ref.on('child_removed', snapshot => emit(snapshot.val()))

    return () => ref.off(event, callback)
  })
  return channel
}

export function * listenRemoveIdeas() {
  const removeChannel = yield call(removeIdeaChannel)

  while(true) {
    const removeIdea = yield take(removeChannel)
    yield put(IdeasActions.removeIdeaSuccess(removeIdea.id))
  }
}
