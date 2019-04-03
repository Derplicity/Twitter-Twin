import reducer from './authReducer';
import * as types from '../actions/types';

describe('userReducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			isAuthenticated: null,
		});
	});

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
