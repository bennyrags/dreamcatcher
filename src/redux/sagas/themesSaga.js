import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_DREAMS" actions
function* fetchThemes(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const id = action.payload;
    
    
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    const response = yield axios.get(`api/Themes/${id}`, config);
    console.log('response:', response);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_THEMES', payload: response.data });
  } catch (error) {
    console.log('THEMES get request failed', error);
  }
}

function* themesSaga() {
  yield takeLatest('FETCH_THEMES', fetchThemes);
}

export default themesSaga;
