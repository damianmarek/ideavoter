import { fork } from 'redux-saga/effects'
import * as ideasSaga from './ideasSaga'
import * as loginSaga from './loginSaga'

export default function * root() {
  yield [
    fork(ideasSaga.watchAddIdea),
    fork(ideasSaga.watchRemoveIdea),

    fork(ideasSaga.listenAddIdeas),
    fork(ideasSaga.listenRemoveIdeas),
    
    fork(ideasSaga.watchLoadLikes),

    fork(ideasSaga.watchLikeIdea),

    fork(loginSaga.watchLoginAttempt),
    fork(loginSaga.watchLogoutAttempt),
    fork(loginSaga.listenAuth),
  ]
}
