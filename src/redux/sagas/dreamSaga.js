import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_DREAMS" actions
function* fetchDream(action) {
console.log(`this is the fetchdream function, here is the action`, action.payload)
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const id = action.payload;
    
    
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    const response = yield axios.get(`api/Dream/${id}`, config);
    console.log('response:', response);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_DREAM', payload: response.data });
  } catch (error) {
    console.log('Dreams get request failed', error);
  }
}

function* addNewDream(action) {
  console.log(`in addNewDream saga, here is action`, action);
  
}


function* dreamSaga() {
  yield takeLatest('FETCH_DREAM', fetchDream);
  yield takeLatest('ADD_NEW_DREAM', addNewDream);
}

export default dreamSaga;
