const themeCountReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_THEME_COUNT':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default themeCountReducer;