const initialState = false;

const themeReducer = (state = initialState, action) => {
  if (action.type === 'change_theme') {
    return action.payload;
  }
  return state;
};

export default themeReducer;
