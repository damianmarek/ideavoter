import { fork } from 'redux-saga/effects'
import { watchAddIdea, watchRemoveIdea, watchLoadIdeas } from './ideasSaga'

export default function * root() {
  yield [
    fork(watchAddIdea),
    fork(watchRemoveIdea),
    fork(watchLoadIdeas),
  ]
}
