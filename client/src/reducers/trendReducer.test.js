import reducer from './trendReducer';
import * as types from '../actions/types';

describe('trendReducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			trends: [],
		});
	});

	describe('GET_TRENDS', () => {
		it('should handle action', () => {
			const action = {
				type: types.GET_TRENDS,
				payload: [{ id: '0123456789' }],
			};

			const expectedState = {
				trends: [{ id: '0123456789' }],
			};

			expect(reducer({}, action)).toEqual(expectedState);

			const prevState = {
				trends: [{ id: '1234567890' }],
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});
});
