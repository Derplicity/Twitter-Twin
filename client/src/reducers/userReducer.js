import {
	GET_CURRENT_USER,
	GET_USERS,
	GET_SUGGESTED_USERS,
} from '../actions/types';

const initialState = {
	user: null,
	users: [],
	suggested_users: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CURRENT_USER:
			return {
				...state,
				user: action.payload,
			};
		case GET_USERS:
			return {
				...state,
				users: action.payload,
			};
		case GET_SUGGESTED_USERS:
			return {
				...state,
				suggested_users: action.payload,
			};
		default:
			return state;
	}
};
