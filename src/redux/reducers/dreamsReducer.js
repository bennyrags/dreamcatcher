const dreamsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DREAMS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default dreamsReducer;
