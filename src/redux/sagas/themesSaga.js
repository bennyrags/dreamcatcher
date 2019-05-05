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

function* fetchThemeCount(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const id = action.payload;
    const response = yield axios.get(`api/Themes/count/${id}`, config);
    yield put({ type: 'SET_THEME_COUNT', payload: response.data });

  }

  catch (error) {
    alert(`There was an error when fetching your themes count. Please try again later.`);
    console.log(`Error when making call to server for themes count`);
    
  }
}

function* themesSaga() {
  yield takeLatest('FETCH_THEMES', fetchThemes);
  yield takeLatest('FETCH_THEME_COUNT', fetchThemeCount);
}

export default themesSaga;
