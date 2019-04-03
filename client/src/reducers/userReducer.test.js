import reducer from './userReducer';
import * as types from '../actions/types';

describe('userReducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			user: null,
			users: [],
			suggested_users: [],
		});
	});

	describe('GET_CURRENT_USER', () => {
		it('should handle action', () => {
			const action = {
				type: types.GET_CURRENT_USER,
				payload: { id: '0123456789' },
			};

			const expectedState = {
				user: { id: '0123456789' },
			};

			expect(reducer({}, action)).toEqual(expectedState);

			const prevState = {
				user: { id: '1234567890' },
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});

	describe('GET_USERS', () => {
		it('should handle action', () => {
			const action = {
				type: types.GET_USERS,
				payload: [{ id: '0123456789' }],
			};

			const expectedState = {
				users: [{ id: '0123456789' }],
			};

			expect(reducer({}, action)).toEqual(expectedState);

			const prevState = {
				users: [{ id: '1234567890' }],
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});

	describe('GET_SUGGESTED_USERS', () => {
		it('should handle action', () => {
			const action = {
				type: types.GET_SUGGESTED_USERS,
				payload: [{ id: '0123456789' }],
			};

			const expectedState = {
				suggested_users: [{ id: '0123456789' }],
			};

			expect(reducer({}, action)).toEqual(expectedState);

			const prevState = {
				suggested_users: [{ id: '1234567890' }],
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});
});
