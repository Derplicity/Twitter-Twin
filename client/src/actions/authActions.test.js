import { mockStore } from '../testUtils';
import localForage from 'localforage';
import * as actions from './authActions';
import * as types from './types';

/* ********************
     AUTH ACTIONS
******************** */
describe('authActions', () => {
  beforeEach(async () => {
    await localForage.setItem('user', '0123456789');
  });

  afterEach(async () => {
    await localForage.removeItem('user');
  });

  /* ********************
      GET USER AUTH
  ******************** */
  describe('getUserAuth', () => {
    it('should dispatch GET_USER_AUTH when user exists', () => {
      const expectedActions = [{ type: types.GET_USER_AUTH, payload: true }];

      const store = mockStore({
        auth: {
          isAuthenticated: null,
        },
      });

      return store.dispatch(actions.getUserAuth()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch GET_USER_AUTH when user does not exist', async () => {
      const expectedActions = [{ type: types.GET_USER_AUTH, payload: false }];

      const store = mockStore({
        auth: {
          isAuthenticated: null,
        },
      });

      await localForage.removeItem('user');

      return store.dispatch(actions.getUserAuth()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  /* ********************
      SET USER AUTH
  ******************** */
  describe('setUserAuth', () => {
    it('should dispatch SET_USER_AUTH when success', () => {
      const expectedActions = [{ type: types.SET_USER_AUTH, payload: true }];

      const store = mockStore({
        auth: {
          isAuthenticated: null,
        },
      });

      return store
        .dispatch(actions.setUserAuth({ _id: '0123456789', success: true }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should dispatch SET_USER_AUTH when !success', () => {
      const expectedAction = { type: types.SET_USER_AUTH, payload: false };

      const store = mockStore({
        auth: {
          isAuthenticated: null,
        },
      });

      expect(
        store.dispatch(
          actions.setUserAuth({ _id: '0123456789', success: false }),
        ),
      ).toEqual(expectedAction);
    });
  });
});
