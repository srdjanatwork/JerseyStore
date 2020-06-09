import { ADD_USER } from 'utils/actions/User';

export const initialState = {
  user: {},
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...initialState,
        user: action.payload.user,
      };
    default:
      return state;
  }
}
