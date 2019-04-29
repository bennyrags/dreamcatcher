import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_DREAMS" actions
function* fetchDream(action) {
//console.log(`this is the fetchdream function, here is the action`, action.payload)
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
   // console.log('response:', response);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_DREAM', payload: response.data });
  } catch (error) {
    console.log('Dreams get request failed', error);
  }
}

function* addNewDream(action) {
  //console.log(`in addNewDream saga, here is action.payload`, action.payload);
  try {
  yield axios.post('/api/dream', action.payload);
  //yield put({type:'FETCH_DREAMS'});
 
}
catch (error) {
  console.log(`error in adding new dream. here is error:`, error);
}

}

function* deleteDream(action) {
  console.log('in deleteDream saga, here is action', action)
  const id = action.payload;

  try {
    yield axios.delete(`api/dream/${id}`);
   // yield put({ type: 'SET_DREAM'});
  }

  catch (error) {
    alert(`There was an error deleting dream. Try again later.`)
    console.log(`Error in deleteDream saga. Here is error:`, error);
    
  }

}

function* updateDream(action) {
  console.log('in editDream saga, here is action', action);
let editedDream = action.payload;
  try {
    yield axios.put(`api/dream/${editedDream.id}`, editedDream);
   yield put({type:'FETCH_DREAM', payload: editedDream.id});
  
  }
  catch (error) {

  }
}


function* dreamSaga() {
  yield takeLatest('FETCH_DREAM', fetchDream);
  yield takeLatest('ADD_NEW_DREAM', addNewDream);
  yield takeLatest('DELETE_DREAM', deleteDream);
  yield takeLatest('UPDATE_DREAM', updateDream);
}

export default dreamSaga;
