import {
	SET_STATUS_LOADING,
	GET_HOME_TIMELINE,
	GET_NEW_HOME_TIMELINE,
	GET_USER_TIMELINE,
	GET_NEW_USER_TIMELINE,
	ADD_STATUS_ACTION,
	REMOVE_STATUS_ACTION,
} from './types';
import localForge from 'localforage';

export const getHomeTimeline = () => dispatch => {
	return localForge
		.getItem('home_timeline')
		.then(saved => {
			const current = new Date();
			if (!saved || !saved.data || current - saved.timestamp > 60000) {
				return localForge
					.getItem('user')
					.then(user => {
						fetch(`/api/statuses/home_timeline?user_id=${user}`)
							.then(res => res.json())
							.then(data =>
								localForge
									.setItem('home_timeline', {
										data: data,
										timestamp: new Date(),
									})
									.then(({ data: newData }) =>
										dispatch({
											type: GET_HOME_TIMELINE,
											payload: newData,
										}),
									)
									.catch(console.error),
							);
					})
					.catch(console.error);
			}

			return dispatch({
				type: GET_HOME_TIMELINE,
				payload: saved.data,
			});
		})
		.catch(console.error);
};

export const getNewHomeTimeline = lastId => dispatch => {
	return localForge
		.getItem('user')
		.then(user =>
			fetch(`/api/statuses/home_timeline?user_id=${user}&max_id=${lastId}`)
				.then(res => res.json())
				.then(data =>
					dispatch({
						type: GET_NEW_HOME_TIMELINE,
						payload: data,
					}),
				)
				.catch(console.error),
		)
		.catch(console.error);
};

export const getUserTimeline = screen_name => dispatch => {
	dispatch({
		type: SET_STATUS_LOADING,
	});

	return localForge
		.getItem(`${screen_name}_timeline`)
		.then(saved => {
			const current = new Date();
			if (!saved || !saved.data || current - saved.timestamp > 1000) {
				return localForge
					.getItem('user')
					.then(user => {
						fetch(
							`/api/statuses/user_timeline?user_id=${user}&screen_name=${screen_name}`,
						)
							.then(res => res.json())
							.then(data =>
								localForge
									.setItem(`${screen_name}_timeline`, {
										data: data,
										timestamp: new Date(),
									})
									.then(({ data: newData }) =>
										dispatch({
											type: GET_USER_TIMELINE,
											payload: newData,
										}),
									)
									.catch(console.error),
							);
					})
					.catch(console.error);
			}

			return dispatch({
				type: GET_USER_TIMELINE,
				payload: saved.data,
			});
		})
		.catch(console.error);
};

export const getNewUserTimeline = (screen_name, lastId) => dispatch => {
	return localForge
		.getItem('user')
		.then(user =>
			fetch(
				`/api/statuses/home_timeline?user_id=${user}&screen_name=${screen_name}&max_id=${lastId}`,
			)
				.then(res => res.json())
				.then(data =>
					dispatch({
						type: GET_NEW_USER_TIMELINE,
						payload: data,
					}),
				)
				.catch(console.error),
		)
		.catch(console.error);
};

export const addStatusAction = (type, id) => dispatch => {
	return localForge
		.getItem('user')
		.then(user => {
			let url = '';
			if (type === 'retweet') {
				url = `/api/statuses/retweet?user_id=${user}&id=${id}`;
			} else if (type === 'like') {
				url = `/api/statuses/like?user_id=${user}&id=${id}`;
			}
			return fetch(url)
				.then(res => res.json())
				.then(data => {
					const resData = type === 'retweet' ? data.retweeted_status : data;
					return localForge
						.getItem('home_timeline')
						.then(({ data: savedData, timestamp }) => {
							const newData = savedData;
							const idx = newData.findIndex(x => x.id_str === resData.id_str);
							if (idx !== -1) newData[idx] = resData;
							return { data: newData, timestamp: timestamp };
						})
						.then(updatedData =>
							localForge.setItem('home_timeline', updatedData),
						)
						.then(({ data: payload }) =>
							dispatch({
								type: ADD_STATUS_ACTION,
								payload: payload,
							}),
						);
				})
				.catch(console.error);
		})
		.catch(console.error);
};

export const removeStatusAction = (type, id) => dispatch => {
	return localForge
		.getItem('user')
		.then(user => {
			let url = '';
			if (type === 'unretweet') {
				url = `/api/statuses/unretweet?user_id=${user}&id=${id}`;
			} else if (type === 'unlike') {
				url = `/api/statuses/unlike?user_id=${user}&id=${id}`;
			}
			return fetch(url)
				.then(res => res.json())
				.then(data => {
					const resData = data;
					if (type === 'unretweet') resData.retweeted = false;
					return localForge
						.getItem('home_timeline')
						.then(({ data: savedData, timestamp }) => {
							const newData = savedData;
							const idx = newData.findIndex(x => x.id_str === resData.id_str);
							if (idx !== -1) newData[idx] = resData;
							return { data: newData, timestamp: timestamp };
						})
						.then(updatedData =>
							localForge.setItem('home_timeline', updatedData),
						)
						.then(({ data: payload }) =>
							dispatch({
								type: REMOVE_STATUS_ACTION,
								payload: payload,
							}),
						);
				})
				.catch(console.error);
		})
		.catch(console.error);
};
