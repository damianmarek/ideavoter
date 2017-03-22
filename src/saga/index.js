import { fork } from 'redux-saga/effects'
import { watchAddIdea, watchRemoveIdea, watchLoadIdeas } from './ideasSaga'
import * as loginSaga from './loginSaga'

export default function * root() {
  yield [
    fork(watchAddIdea),
    fork(watchRemoveIdea),
    fork(watchLoadIdeas),
    fork(loginSaga.watchLoginAttempt),
    fork(loginSaga.watchLogoutAttempt),
  ]
}
