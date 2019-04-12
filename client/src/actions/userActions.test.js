import { mockStore } from '../testUtils';
import moxios from 'moxios';
import localForage from 'localforage';
import * as actions from './userActions';
import * as types from './types';

/* ********************
      USER ACTIONS
******************** */
describe('userActions', () => {
  beforeEach(async () => {
    moxios.install();
    await localForage.setItem('user', '0123456789');
  });

  afterEach(async () => {
    moxios.uninstall();
    await localForage.removeItem('user');
  });

  /* ********************
     GET CURRENT USER
  ******************** */
  describe('getCurrentUser()', () => {
    it('should dispatch GET_CURRENT_USER once data is received', () => {
      const expectedResponse = {
        id: '0123456789',
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: expectedResponse,
        });
      });

      const expectedActions = [
        { type: types.GET_CURRENT_USER, payload: expectedResponse },
      ];

      const store = mockStore({
        user: {
          user: null,
        },
      });

      return store.dispatch(actions.getCurrentUser()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  /* ********************
        GET USERS
  ******************** */
  describe('getUsers()', () => {
    it('should dispatch GET_USERS once data is received', () => {
      const expectedResponse = [
        {
          id: '0123456789',
        },
      ];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: expectedResponse,
        });
      });

      const expectedActions = [
        { type: types.GET_USERS, payload: expectedResponse },
      ];

      const store = mockStore({
        user: {
          users: [],
        },
      });

      const q = 'test';

      return store.dispatch(actions.getUsers(q)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch GET_USERS with invalid queries', () => {
      const expectedAction = { type: types.GET_USERS, payload: [] };

      const store = mockStore({
        user: {
          users: [],
        },
      });

      expect(store.dispatch(actions.getUsers(''))).toEqual(expectedAction);
      expect(store.dispatch(actions.getUsers(' '))).toEqual(expectedAction);
      expect(store.dispatch(actions.getUsers())).toEqual(expectedAction);
    });
  });

  /* ********************
    GET SUGGESTED USERS
  ******************** */
  describe('getSuggestedUsers()', () => {
    it('should dispatch GET_SUGGESTED_USERS once data is received', () => {
      const expectedResponse = [
        {
          id: '0123456789',
        },
      ];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: expectedResponse,
        });
      });

      const expectedActions = [
        { type: types.GET_SUGGESTED_USERS, payload: expectedResponse },
      ];

      const store = mockStore({
        user: {
          suggested_users: [],
        },
      });

      return store.dispatch(actions.getSuggestedUsers()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
