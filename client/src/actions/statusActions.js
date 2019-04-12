import {
  SET_STATUS_LOADING,
  GET_HOME_TIMELINE,
  GET_NEW_HOME_TIMELINE,
  GET_USER_TIMELINE,
  GET_NEW_USER_TIMELINE,
  ADD_STATUS_ACTION,
  REMOVE_STATUS_ACTION,
} from './types';
import localForage from 'localforage';
import axios from 'axios';

export const getHomeTimeline = () => dispatch => {
  return localForage
    .getItem('home_timeline')
    .then(saved => {
      const current = new Date();
      if (!saved || !saved.data || current - saved.timestamp > 60000) {
        return localForage
          .getItem('user')
          .then(user =>
            axios
              .get(`/api/statuses/home_timeline?user_id=${user}`)
              .then(res => res.data)
              .then(data =>
                localForage
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
              ),
          )
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
  return localForage
    .getItem('user')
    .then(user =>
      axios
        .get(`/api/statuses/home_timeline?user_id=${user}&max_id=${lastId}`)
        .then(res => res.data)
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

  return localForage
    .getItem(`${screen_name}_timeline`)
    .then(saved => {
      const current = new Date();
      if (!saved || !saved.data || current - saved.timestamp > 1000) {
        return localForage
          .getItem('user')
          .then(user =>
            axios
              .get(
                `/api/statuses/user_timeline?user_id=${user}&screen_name=${screen_name}`,
              )
              .then(res => res.data)
              .then(data =>
                localForage
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
              ),
          )
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
  return localForage
    .getItem('user')
    .then(user =>
      axios
        .get(
          `/api/statuses/home_timeline?user_id=${user}&screen_name=${screen_name}&max_id=${lastId}`,
        )
        .then(res => res.data)
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
  return localForage
    .getItem('user')
    .then(user => {
      let url = '';
      if (type === 'retweet') {
        url = `/api/statuses/retweet?user_id=${user}&id=${id}`;
      } else if (type === 'like') {
        url = `/api/statuses/like?user_id=${user}&id=${id}`;
      }
      return axios
        .get(url)
        .then(res => res.data)
        .then(data => {
          const resData = type === 'retweet' ? data.retweeted_status : data;
          return localForage
            .getItem('home_timeline')
            .then(({ data: savedData, timestamp }) => {
              const newData = savedData;
              const idx = newData.findIndex(x => x.id_str === resData.id_str);
              if (idx !== -1) newData[idx] = resData;
              return { data: newData, timestamp: timestamp };
            })
            .then(updatedData =>
              localForage.setItem('home_timeline', updatedData),
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
  return localForage
    .getItem('user')
    .then(user => {
      let url = '';
      if (type === 'unretweet') {
        url = `/api/statuses/unretweet?user_id=${user}&id=${id}`;
      } else if (type === 'unlike') {
        url = `/api/statuses/unlike?user_id=${user}&id=${id}`;
      }
      return axios
        .get(url)
        .then(res => res.data)
        .then(data => {
          const resData = data;
          if (type === 'unretweet') resData.retweeted = false;
          return localForage
            .getItem('home_timeline')
            .then(({ data: savedData, timestamp }) => {
              const newData = savedData;
              const idx = newData.findIndex(x => x.id_str === resData.id_str);
              if (idx !== -1) newData[idx] = resData;
              return { data: newData, timestamp: timestamp };
            })
            .then(updatedData =>
              localForage.setItem('home_timeline', updatedData),
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
