import { mockStore } from '../testUtils';
import moxios from 'moxios';
import localForage from 'localforage';
import * as actions from './trendActions';
import * as types from './types';

/* ********************
    TREND ACTIONS
******************** */
describe('trendActions', () => {
	beforeEach(async () => {
		moxios.install();
		await localForage.setItem('user', '0123456789');
	});

	afterEach(async () => {
		moxios.uninstall();
		await localForage.removeItem('user');
	});

	/* ********************
        GET TRENDS
  ******************** */
	describe('getTrends()', () => {
		it('should dispatch GET_TRENDS once data is received', () => {
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
				{ type: types.GET_TRENDS, payload: expectedResponse },
			];

			const store = mockStore({
				trend: {
					trends: [],
				},
			});

			const q = 'test';

			return store.dispatch(actions.getTrends(q)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});

		it('should dispatch GET_TRENDS with invalid queries', () => {
			const expectedAction = { type: types.GET_TRENDS, payload: [] };

			const store = mockStore({
				trend: {
					trends: [],
				},
			});

			expect(store.dispatch(actions.getTrends(''))).toEqual(expectedAction);
			expect(store.dispatch(actions.getTrends(' '))).toEqual(expectedAction);
			expect(store.dispatch(actions.getTrends())).toEqual(expectedAction);
		});
	});
});
