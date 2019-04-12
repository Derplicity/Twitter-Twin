import { mockStore } from '../testUtils';
import moxios from 'moxios';
import localForage from 'localforage';
import * as actions from './statusActions';
import * as types from './types';

/* ********************
     STATUS ACTIONS
******************** */
describe('statusActions', () => {
  beforeEach(async () => {
    moxios.install();
    await localForage.setItem('user', '0123456789');
  });

  afterEach(async () => {
    moxios.uninstall();
    await localForage.removeItem('user');
  });

  /* ********************
      GET HOME TIMELINE
  ******************** */
  describe('getHomeTimeline()', () => {
    it('should dispatch GET_HOME_TIMELINE once data is received', () => {
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
        { type: types.GET_HOME_TIMELINE, payload: expectedResponse },
      ];

      const store = mockStore({
        status: {
          home_timeline: [],
        },
      });

      return store.dispatch(actions.getHomeTimeline()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);

        return localForage.getItem('home_timeline').then(response => {
          expect(response.data).toEqual(expectedResponse);

          return localForage.removeItem('home_timeline');
        });
      });
    });

    it('should dispatch GET_HOME_TIMELINE when saved data is old', async () => {
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
        { type: types.GET_HOME_TIMELINE, payload: expectedResponse },
      ];

      const store = mockStore({
        status: {
          home_timeline: [],
        },
      });

      await localForage.setItem('home_timeline', {
        data: [{ id: '1234567890' }],
        timestamp: new Date() - 60001,
      });

      return store.dispatch(actions.getHomeTimeline()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);

        return localForage.getItem('home_timeline').then(response => {
          expect(response.data).toEqual(expectedResponse);

          return localForage.removeItem('home_timeline');
        });
      });
    });

    it('should dispatch GET_HOME_TIMELINE when saved data is fresh', async () => {
      const expectedResponse = [
        {
          id: '0123456789',
        },
      ];

      const expectedActions = [
        { type: types.GET_HOME_TIMELINE, payload: expectedResponse },
      ];

      const store = mockStore({
        status: {
          home_timeline: [],
        },
      });

      await localForage.setItem('home_timeline', {
        data: expectedResponse,
        timestamp: new Date(),
      });

      return store.dispatch(actions.getHomeTimeline()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);

        return localForage.getItem('home_timeline').then(response => {
          expect(response.data).toEqual(expectedResponse);

          return localForage.removeItem('home_timeline');
        });
      });
    });
  });

  /* ********************
    GET NEW HOME TIMELINE
  ******************** */
  describe('getNewHomeTimeline()', () => {
    it('should dispatch GET_NEW_HOME_TIMELINE when data is received', () => {
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
        { type: types.GET_NEW_HOME_TIMELINE, payload: expectedResponse },
      ];

      const store = mockStore({
        status: {
          home_timeline: [],
        },
      });

      const lastId = 0;

      return store.dispatch(actions.getNewHomeTimeline(lastId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  /* ********************
    GET USER TIMELINE
  ******************** */
  describe('getUserTimeline()', () => {
    it('should dispatch GET_USER_TIMELINE once data is received', () => {
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
        { type: types.SET_STATUS_LOADING },
        { type: types.GET_USER_TIMELINE, payload: expectedResponse },
      ];

      const store = mockStore({
        status: {
          user_timeline: [],
        },
      });

      const screen_name = 'test';

      return store.dispatch(actions.getUserTimeline(screen_name)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);

        return localForage.getItem(`${screen_name}_timeline`).then(response => {
          expect(response.data).toEqual(expectedResponse);

          return localForage.removeItem(`${screen_name}_timeline`);
        });
      });
    });

    it('should dispatch GET_USER_TIMELINE when saved data is old', async () => {
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
        { type: types.SET_STATUS_LOADING },
        { type: types.GET_USER_TIMELINE, payload: expectedResponse },
      ];

      const store = mockStore({
        status: {
          user_timeline: [],
        },
      });

      const screen_name = 'test';

      await localForage.setItem(`${screen_name}_timeline`, {
        data: [{ id: '1234567890' }],
        timestamp: new Date() - 60001,
      });

      return store.dispatch(actions.getUserTimeline(screen_name)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);

        return localForage.getItem(`${screen_name}_timeline`).then(response => {
          expect(response.data).toEqual(expectedResponse);

          return localForage.removeItem(`${screen_name}_timeline`);
        });
      });
    });

    it('should dispatch GET_USER_TIMELINE when saved data is fresh', async () => {
      const expectedResponse = [
        {
          id: '0123456789',
        },
      ];

      const expectedActions = [
        { type: types.SET_STATUS_LOADING },
        { type: types.GET_USER_TIMELINE, payload: expectedResponse },
      ];

      const store = mockStore({
        status: {
          user_timeline: [],
        },
      });

      const screen_name = 'test';

      await localForage.setItem(`${screen_name}_timeline`, {
        data: expectedResponse,
        timestamp: new Date(),
      });

      return store.dispatch(actions.getUserTimeline(screen_name)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);

        return localForage.getItem(`${screen_name}_timeline`).then(response => {
          expect(response.data).toEqual(expectedResponse);

          return localForage.removeItem(`${screen_name}_timeline`);
        });
      });
    });
  });

  /* ********************
    GET NEW USER TIMELINE
  ******************** */
  describe('getNewUserTimeline()', () => {
    it('should dispatch GET_NEW_USER_TIMELINE when data is received', () => {
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
        { type: types.GET_NEW_USER_TIMELINE, payload: expectedResponse },
      ];

      const store = mockStore({
        status: {
          user_timeline: [],
        },
      });

      const screen_name = 'test';
      const lastId = 0;

      return store
        .dispatch(actions.getNewUserTimeline(screen_name, lastId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  /* ********************
     ADD STATUS ACTION
  ******************** */
  describe('addStatusAction()', () => {
    it('should dispatch ADD_STATUS_ACTION when data is received', async () => {
      const id_str = '0123456789';
      const expectedResponse = {
        id_str,
        liked: true,
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: expectedResponse,
        });
      });

      const prevState = [
        {
          id_str: '1234567890',
          liked: false,
        },
        {
          id_str,
          liked: false,
        },
      ];

      const expectedPayload = [
        {
          id_str: '1234567890',
          liked: false,
        },
        {
          id_str,
          liked: true,
        },
      ];

      const expectedActions = [
        { type: types.ADD_STATUS_ACTION, payload: expectedPayload },
      ];

      const store = mockStore({
        status: {
          home_timeline: prevState,
        },
      });

      await localForage.setItem('home_timeline', {
        data: prevState,
        timestamp: 0,
      });

      let type = 'like';

      store.dispatch(actions.addStatusAction(type, id_str)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);

        return localForage.getItem('home_timeline').then(response => {
          expect(response.data).toEqual(expectedPayload);

          return localForage.removeItem('home_timeline');
        });
      });

      type = 'retweet';

      store.dispatch(actions.addStatusAction(type, id_str)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);

        return localForage.getItem('home_timeline').then(response => {
          expect(response.data).toEqual(expectedPayload);

          return localForage.removeItem('home_timeline');
        });
      });
    });
  });

  /* ********************
    REMOVE STATUS ACTION
  ******************** */
  describe('removeStatusAction()', () => {
    it('should dispatch REMOVE_STATUS_ACTION when data is received', async () => {
      const id_str = '0123456789';
      const expectedResponse = {
        id_str,
        liked: false,
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: expectedResponse,
        });
      });

      const prevState = [
        {
          id_str: '1234567890',
          liked: true,
        },
        {
          id_str,
          liked: true,
        },
      ];

      const expectedPayload = [
        {
          id_str: '1234567890',
          liked: true,
        },
        {
          id_str,
          liked: false,
        },
      ];

      const expectedActions = [
        { type: types.REMOVE_STATUS_ACTION, payload: expectedPayload },
      ];

      const store = mockStore({
        status: {
          home_timeline: prevState,
        },
      });

      await localForage.setItem('home_timeline', {
        data: prevState,
        timestamp: 0,
      });

      let type = 'like';

      store.dispatch(actions.removeStatusAction(type, id_str)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);

        return localForage.getItem('home_timeline').then(response => {
          expect(response.data).toEqual(expectedPayload);

          return localForage.removeItem('home_timeline');
        });
      });

      type = 'retweet';

      store.dispatch(actions.removeStatusAction(type, id_str)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);

        return localForage.getItem('home_timeline').then(response => {
          expect(response.data).toEqual(expectedPayload);

          return localForage.removeItem('home_timeline');
        });
      });
    });
  });
});
