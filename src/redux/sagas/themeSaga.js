import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_DREAMS" actions
function* fetchTheme(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const id = action.payload;
    
    
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    const response = yield axios.get(`api/Theme/${id}`, config);
    console.log('response:', response);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_THEME', payload: response.data });
  } catch (error) {
    console.log('THEME get request failed', error);
  }
}

function* addNewTheme(action) {
  console.log(`this is addNewTheme`)
  console.log(`this is addNewTheme action,`, action.payload)
  
  try {
  let newTheme = action.payload;

  yield axios.post(`api/Theme`, newTheme);
}

catch (error) {
  console.log('Th')
}
}


function* themeSaga() {
  yield takeLatest('FETCH_THEME', fetchTheme);
  yield takeLatest('ADD_NEW_THEME', addNewTheme);
}

export default themeSaga;
