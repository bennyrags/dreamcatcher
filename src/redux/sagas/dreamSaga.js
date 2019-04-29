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
  console.log(`in addNewDream saga, here is action.payload`, action.payload);
  try {
  yield axios.post('/api/dream', action.payload);
  //yield put({type:'FETCH_DREAMS'});
  //how do get the most recent dream id from this? to use in something like this?

  /*

yield (action.payload.dreamInfo) = > {
  axios.post('api/dream', action.payload.dreamInfo)
  .then(response => {
    return response.data.message
  }
    
  )
  .catch(error => {
    console.log(`error when trying to addNEWDream in crazy func`)
  })
}


  need to get the id in there somehow....
yield (id) => {
  for (i=0; i<dream.theme.length; i++) 
  {
    axios.post('/api/dream', action.payload)
  }
}
  */
}
catch (error) {
  console.log(`error in adding new dream. here is error:`, error);
}

//maybe do the below with await 
//ok i think what i have to do here is a series of yields. 

//yield 1 - post payload.dream info to server. get dream id back as response. 
//capture that id in a const
//use that const in a loop to post indiv theme ids with the saved dream id


}


function* dreamSaga() {
  yield takeLatest('FETCH_DREAM', fetchDream);
  yield takeLatest('ADD_NEW_DREAM', addNewDream);
}

export default dreamSaga;
