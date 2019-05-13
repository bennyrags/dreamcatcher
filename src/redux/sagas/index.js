import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import dreamsSaga from './dreamsSaga'
import dreamSaga from './dreamSaga'
import themesSaga from './themesSaga'
import themeSaga from './themeSaga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas:
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    dreamsSaga(),
    dreamSaga(),
    themesSaga(),
    themeSaga(),
  ]);
}
