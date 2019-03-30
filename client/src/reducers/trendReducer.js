import { GET_TRENDS } from '../actions/types';

const initialState = {
	trends: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_TRENDS:
			return {
				...state,
				trends: action.payload,
			};
		default:
			return state;
	}
};
