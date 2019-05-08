import dreamAddReducer from './dreamAddReducer';

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


let testAction = {
    type: 'ADD_DREAM_DESCRIPTION',
    Payload: ['testAction']
    }
    

test('see if ADD_DREAM_DESCRIPTION changes state', ()=>{
expects(dreamAddReducer([],testAction)).toBe('') 

})

//ok i have to see if state updates 