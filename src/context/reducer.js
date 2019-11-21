const reducer = (state, action) => {
  switch(action.type) {
    case 'set':
      return { ...state, [action.payload.key]: action.payload.value }

    default:
      throw new Error(`${action} not implemented`);
  }
};

export const initialState = {
  hasPlayButton: false,
};

export default reducer;
