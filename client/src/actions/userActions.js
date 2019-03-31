import { GET_CURRENT_USER, GET_USERS, GET_SUGGESTED_USERS } from './types';
import localForage from 'localforage';
import axios from 'axios';

export const getCurrentUser = () => dispatch => {
	return localForage
		.getItem('user')
		.then(user =>
			axios
				.get(`/api/users/show?user_id=${user}`)
				.then(res => res.data)
				.then(data =>
					dispatch({
						type: GET_CURRENT_USER,
						payload: data,
					}),
				),
		)
		.catch(console.error);
};

export const getUsers = q => dispatch => {
	q = q.replace(/[^0-9a-z]/gi, '');
	if (q.trim().length === 0) {
		return dispatch({
			type: GET_USERS,
			payload: [],
		});
	}

	return localForage
		.getItem('user')
		.then(user =>
			axios
				.get(
					`/api/users/search?user_id=${user}&q=${encodeURIComponent(
						q,
					)}&count=10`,
				)
				.then(res => res.data)
				.then(data =>
					dispatch({
						type: GET_USERS,
						payload: data,
					}),
				),
		)
		.catch(console.error);
};

export const getSuggestedUsers = () => dispatch => {
	return localForage
		.getItem('suggested_users')
		.then(saved => {
			const current = new Date();
			if (!saved || !saved.data || current - saved.timestamp > 60000) {
				return localForage
					.getItem('user')
					.then(user =>
						axios
							.get(`/api/users/suggestions?user_id=${user}`)
							.then(res => res.data)
							.then(data =>
								localForage
									.setItem('suggested_users', {
										data: data,
										timestamp: new Date(),
									})
									.then(({ data: newData }) =>
										dispatch({
											type: GET_SUGGESTED_USERS,
											payload: newData,
										}),
									)
									.catch(console.error),
							),
					)
					.catch(console.error);
			}

			return dispatch({
				type: GET_SUGGESTED_USERS,
				payload: saved.data,
			});
		})
		.catch(console.error);
};
