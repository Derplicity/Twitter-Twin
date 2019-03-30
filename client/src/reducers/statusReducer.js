import {
	SET_STATUS_LOADING,
	GET_HOME_TIMELINE,
	GET_NEW_HOME_TIMELINE,
	GET_USER_TIMELINE,
	GET_NEW_USER_TIMELINE,
	ADD_STATUS_ACTION,
	REMOVE_STATUS_ACTION,
} from '../actions/types';

const initialState = {
	home_timeline: [],
	user_timeline: [],
	more_data: true,
	is_loading: true,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_STATUS_LOADING:
			return {
				...state,
				is_loading: true,
			};
		case GET_HOME_TIMELINE:
			return {
				...state,
				home_timeline: action.payload,
				more_data: true,
				is_loading: false,
			};
		case GET_NEW_HOME_TIMELINE:
			return {
				...state,
				home_timeline: [...state.home_timeline, ...action.payload],
				more_data: action.payload.length === 0 ? false : true,
			};
		case GET_USER_TIMELINE:
			return {
				...state,
				user_timeline: action.payload,
				more_data: true,
				is_loading: false,
			};
		case GET_NEW_USER_TIMELINE:
			return {
				...state,
				user_timeline: [...state.user_timeline, ...action.payload],
				more_data: action.payload.length === 0 ? false : true,
			};
		case ADD_STATUS_ACTION:
			return {
				...state,
				home_timeline: action.payload,
			};
		case REMOVE_STATUS_ACTION:
			return {
				...state,
				home_timeline: action.payload,
			};
		default:
			return state;
	}
};
