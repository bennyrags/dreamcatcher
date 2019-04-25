const themeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_THEME':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default themeReducer;

