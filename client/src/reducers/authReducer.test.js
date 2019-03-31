import authReducer from './authReducer';
import { GET_USER_AUTH, SET_USER_AUTH } from '../actions/types';

describe('Auth Reducer', () => {
	it('should return default state', () => {
		const initialState = {
			isAuthenticated: null,
		};
		const newState = authReducer(undefined, {});
		expect(newState).toEqual(initialState);
	});

	it('should return new state if receiving type', () => {
		const auth = true;
		const expectedState = {
			isAuthenticated: auth,
		};
		const newState = authReducer(undefined, {
			type: GET_USER_AUTH,
			payload: auth,
		});

		expect(newState).toEqual(expectedState);
	});
});
