import {LOADING, ERROR, SET_USER} from './types';

export const setLoading = (loading, dispatch) => {
  dispatch({
    type: LOADING,
    payload: loading,
  });
};
export const setError = (error, dispatch) => {
  setLoading(false, dispatch);
  dispatch({
    type: ERROR,
    payload: error,
  });
};
export const setUserDispatch = (user, dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};
