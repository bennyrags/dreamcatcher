const dreamReducer = (state = [], action) => {
 console.log(`inside dreamReducer here is action.payload`, action.payload);
 
  switch (action.type) {
    case 'SET_DREAM':
      return action.payload;
    default: 
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default dreamReducer;
