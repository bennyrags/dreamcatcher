
const newDream = {
user_id: 0,
date: new Date(),
description: '',
score_temp: 0,
score_mood: 0,
themes: []
}

const dreamAddReducer = (state = newDream, action) => {
    console.log(`inside dreamAddReducer here is action.payload`, action.payload);
    
     if (action.type === 'ADD_DREAM_DESCRIPTION') {
         return {
             ...state,
             user_id: Number(action.payload.id),
             description: action.payload.description,
         };
    }

    else if (action.type === 'ADD_TEMP_SCORE') {
         return {
             ...state,
             score_temp: Number(action.payload),
         }
}
    else if (action.type === 'ADD_MOOD_SCORE') {
         return {
             ...state,
             score_mood: Number(action.payload),
         }
}
         //LAST SWITCH, SEND TO SAGA
       else {
         return state;
        }
    };
   
   // user will be on the redux state at:
   // state.user
   export default dreamAddReducer;