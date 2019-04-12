import { GET_USER_AUTH, SET_USER_AUTH } from '../actions/types';

const initialState = {
  isAuthenticated: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SET_USER_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};
