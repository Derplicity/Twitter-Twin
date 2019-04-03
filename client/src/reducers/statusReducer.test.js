import reducer from './statusReducer';
import * as types from '../actions/types';

/* ********************
    STATUS REDUCER
******************** */
describe('statusReducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			home_timeline: [],
			user_timeline: [],
			more_data: true,
			is_loading: true,
		});
	});

	/* ********************
    SET STATUS LOADING
  ******************** */
	describe('SET_STATUS_LOADING', () => {
		it('should handle action', () => {
			const action = {
				type: types.SET_STATUS_LOADING,
			};

			const expectedState = {
				is_loading: true,
			};

			expect(reducer({}, action)).toEqual(expectedState);

			const prevState = {
				is_loading: false,
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});

	/* ********************
     GET HOME TIMELINE
  ******************** */
	describe('GET_HOME_TIMELINE', () => {
		it('should handle action', () => {
			const action = {
				type: types.GET_HOME_TIMELINE,
				payload: [{ id: '0123456789' }],
			};

			const expectedState = {
				home_timeline: [{ id: '0123456789' }],
				more_data: true,
				is_loading: false,
			};

			expect(reducer({}, action)).toEqual(expectedState);

			const prevState = {
				home_timeline: [{ id: '1234567890' }],
				more_data: false,
				is_loading: true,
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});

	/* ********************
   GET NEW HOME TIMELINE
  ******************** */
	describe('GET_NEW_HOME_TIMELINE', () => {
		it('should handle action', () => {
			const action = {
				type: types.GET_NEW_HOME_TIMELINE,
				payload: [{ id: '0123456789' }],
			};

			expect(() => reducer({}, action)).toThrow();

			let expectedState = {
				home_timeline: [{ id: '1234567890' }, { id: '0123456789' }],
				more_data: true,
			};

			const prevState = {
				home_timeline: [{ id: '1234567890' }],
			};

			expect(reducer(prevState, action)).toEqual(expectedState);

			action.payload = [];
			expectedState = {
				home_timeline: prevState.home_timeline,
				more_data: false,
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});

	/* ********************
     GET USER TIMELINE
  ******************** */
	describe('GET_USER_TIMELINE', () => {
		it('should handle action', () => {
			const action = {
				type: types.GET_USER_TIMELINE,
				payload: [{ id: '0123456789' }],
			};

			const expectedState = {
				user_timeline: [{ id: '0123456789' }],
				more_data: true,
				is_loading: false,
			};

			expect(reducer({}, action)).toEqual(expectedState);

			const prevState = {
				user_timeline: [{ id: '1234567890' }],
				more_data: false,
				is_loading: true,
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});

	/* ********************
   GET NEW USER TIMELINE
  ******************** */
	describe('GET_NEW_USER_TIMELINE', () => {
		it('should handle action', () => {
			const action = {
				type: types.GET_NEW_USER_TIMELINE,
				payload: [{ id: '0123456789' }],
			};

			expect(() => reducer({}, action)).toThrow();

			let expectedState = {
				user_timeline: [{ id: '1234567890' }, { id: '0123456789' }],
				more_data: true,
			};

			const prevState = {
				user_timeline: [{ id: '1234567890' }],
			};

			expect(reducer(prevState, action)).toEqual(expectedState);

			action.payload = [];
			expectedState = {
				user_timeline: prevState.user_timeline,
				more_data: false,
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});

	/* ********************
     ADD STATUS ACTION
  ******************** */
	describe('ADD_STATUS_ACTION', () => {
		it('should handle action', () => {
			const action = {
				type: types.ADD_STATUS_ACTION,
				payload: [{ id: '0123456789' }],
			};

			const expectedState = {
				home_timeline: [{ id: '0123456789' }],
			};

			expect(reducer({}, action)).toEqual(expectedState);

			const prevState = {
				home_timeline: [{ id: '1234567890' }],
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});

	/* ********************
   REMOVE STATUS ACTION
  ******************** */
	describe('REMOVE_STATUS_ACTION', () => {
		it('should handle action', () => {
			const action = {
				type: types.REMOVE_STATUS_ACTION,
				payload: [{ id: '0123456789' }],
			};

			const expectedState = {
				home_timeline: [{ id: '0123456789' }],
			};

			expect(reducer({}, action)).toEqual(expectedState);

			const prevState = {
				home_timeline: [{ id: '1234567890' }],
			};

			expect(reducer(prevState, action)).toEqual(expectedState);
		});
	});
});
