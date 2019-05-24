
const newDream = {
    themes: [],
    dreamInfo: {
        user_id: 0,
        date: '',
        description: '',
        score_temp: 0,
        score_mood: 0,
        date:null

    }
}

const dreamAddReducer = (state = newDream, action) => {

    if (action.type === 'ADD_DREAM_DESCRIPTION') {
        return {
                dreamInfo: {
            ...state.dreamInfo,
            user_id: Number(action.payload.id),
            description: action.payload.description,
            date: new Date()
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

        return state;

    }


    else {
        return state;
    }
};

// user will be on the redux state at:
// state.user
export default dreamAddReducer;