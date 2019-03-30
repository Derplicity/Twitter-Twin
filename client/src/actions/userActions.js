import { GET_CURRENT_USER, GET_USERS, GET_SUGGESTED_USERS } from './types';
import localForge from 'localforage';

export const getCurrentUser = () => dispatch => {
	localForge
		.getItem('user')
		.then(user => {
			fetch(`/api/users/show?user_id=${user}`)
				.then(res => res.json())
				.then(data =>
					dispatch({
						type: GET_CURRENT_USER,
						payload: data,
					}),
				);
		})
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

	localForge
		.getItem('user')
		.then(user => {
			fetch(
				`/api/users/search?user_id=${user}&q=${encodeURIComponent(q)}&count=10`,
			)
				.then(res => res.json())
				.then(data =>
					dispatch({
						type: GET_USERS,
						payload: data,
					}),
				);
		})
		.catch(console.error);
};

export const getSuggestedUsers = () => dispatch => {
	localForge
		.getItem('suggested_users')
		.then(saved => {
			const current = new Date();
			if (!saved || !saved.data || current - saved.timestamp > 60000) {
				return localForge
					.getItem('user')
					.then(user => {
						fetch(`/api/users/suggestions?user_id=${user}`)
							.then(res => res.json())
							.then(data =>
								localForge
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
							);
					})
					.catch(console.error);
			}

			return dispatch({
				type: GET_SUGGESTED_USERS,
				payload: saved.data,
			});
		})
		.catch(console.error);
};
