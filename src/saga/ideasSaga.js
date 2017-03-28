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
    yield firebase.database().ref(`likes/${key}`)
    .remove().catch((err) => {
      console.log(err)
    })
}

export function * watchLikeIdea() {
  yield takeEvery(IdeasTypes.LIKE_IDEA_ATTEMPT, likeIdea)
}

function * likeIdea({ key }) {
  const loginState = yield select(selectLogin)
  // Check if already liked before sending like to Firebase
  const likeState = yield firebase.database().ref(`likes/${key}/voters/${loginState.uid}`).once('value')
  // Send like
  yield firebase.database().ref(`likes/${key}/voters/${loginState.uid}`).set(true)
  .catch((err) => {
    console.log(err)
  })
  // Allow to like only once
  if(likeState.val()) {
    console.log('Already liked')
  } else {
    yield put(IdeasActions.likeIdeaSuccess(key))
  }
}

export function * watchLoadLikes() {
    yield takeEvery(IdeasTypes.LOAD_LIKES, loadLikes)
}

function * loadLikes() {
  const snap = yield firebase.database().ref('likes').once('value')
  for( let el of Object.keys(snap.val() || {})) {
    const val = Object.keys(snap.val()[el].voters).length
    yield put(IdeasActions.setIdeaLikes(el, val))
  }
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
