
const newDream = {
    themes: [],
    dreamInfo: {
        user_id: 0,
        date: new Date(),
        description: '',
        score_temp: 0,
        score_mood: 0,

    }
}

const dreamAddReducer = (state = newDream, action) => {
    //console.log(`inside dreamAddReducer here is action.payload`, action.payload);

    if (action.type === 'ADD_DREAM_DESCRIPTION') {
        return {
                dreamInfo: {
            ...state.dreamInfo,
            user_id: Number(action.payload.id),
            description: action.payload.description,
        }
        };
    }

    else if (action.type === 'ADD_TEMP_SCORE') {
        return {
            dreamInfo: {
        ...state.dreamInfo,
            score_temp: Number(action.payload),
        }
    }
    }
    else if (action.type === 'ADD_MOOD_SCORE') {
        return {
            dreamInfo: {
        ...state.dreamInfo,
            score_mood: Number(action.payload),
        }
    }
    }

    else if (action.type === 'ADD_THEMES') {
        return {
            themes: action.payload, 
            dreamInfo:{
            ...state.dreamInfo
            }
        }
    }

    else if (action.type === 'SUBMIT_DREAM') {
        //LAST type, SEND TO SAGA
       // console.log(`submit dream clicked, here's state:`, state);

        return state;

    }


    else {
        return state;
    }
};

// user will be on the redux state at:
// state.user
export default dreamAddReducer;