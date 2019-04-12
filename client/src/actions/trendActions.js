import { GET_TRENDS } from './types';
import localForage from 'localforage';
import axios from 'axios';

export const getTrends = query => dispatch => {
  let q = !!query ? query : '';
  const hasHT = q.trim().startsWith('#') ? true : false;
  q = q.replace(/[^0-9a-z]/gi, '');
  q = hasHT ? `#${q}` : q;
  if (q.trim().length === 0) {
    return dispatch({
      type: GET_TRENDS,
      payload: [],
    });
  }

  return localForage
    .getItem('user')
    .then(user =>
      axios
        .get(
          `/api/trends/place?user_id=${user}&q=${encodeURIComponent(q)}&id=1`,
        )
        .then(res => res.data)
        .then(data =>
          dispatch({
            type: GET_TRENDS,
            payload: data,
          }),
        ),
    )
    .catch(console.error);
};
