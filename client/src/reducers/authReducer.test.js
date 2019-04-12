import reducer from './authReducer';
import * as types from '../actions/types';

/* ********************
    USER REDUCER
******************** */
describe('userReducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: null,
    });
  });

  /* ********************
      GET USER AUTH
  ******************** */
  describe('GET_USER_AUTH', () => {
    it('should handle action', () => {
      const action = {
        type: types.GET_USER_AUTH,
        payload: true,
      };

      const expectedState = {
        isAuthenticated: true,
      };

      expect(reducer({}, action)).toEqual(expectedState);

      const prevState = {
        isAuthenticated: false,
      };

      expect(reducer(prevState, action)).toEqual(expectedState);
    });
  });

  /* ********************
      SET USER AUTH
  ******************** */
  describe('SET_USER_AUTH', () => {
    it('should handle action', () => {
      const action = {
        type: types.SET_USER_AUTH,
        payload: true,
      };

      const expectedState = {
        isAuthenticated: true,
      };

      expect(reducer({}, action)).toEqual(expectedState);

      const prevState = {
        isAuthenticated: false,
      };

      expect(reducer(prevState, action)).toEqual(expectedState);
    });
  });
});
