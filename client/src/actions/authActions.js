import { GET_USER_AUTH, SET_USER_AUTH } from './types';
import localForage from 'localforage';

export const getUserAuth = () => dispatch => {
  return localForage
    .getItem('user')
    .then(user =>
      dispatch({ type: GET_USER_AUTH, payload: user ? true : false }),
    )
    .catch(console.error);
};

export const setUserAuth = userAuth => dispatch => {
  const { _id, success } = userAuth;

  if (!success) return dispatch({ type: SET_USER_AUTH, payload: success });

  return localForage
    .setItem('user', _id)
    .then(() => localForage.getItem('user'))
    .then(user => dispatch({ type: SET_USER_AUTH, payload: success }))
    .catch(console.error);
};
