import createReducer from '../createReducer';
import {LOADING, ERROR, SET_USER} from './types';

export const INITIAL_STATE_GLOBAL = {
  loading: false,
  error: false,
  user: {
    email: '',
    password: '',
  },
};

const setLoading = (state, action) => {
  return {
    ...state,
    loading: action.payload,
  };
};

const setError = (state, action) => {
  return {
    ...state,
    error: action.payload,
  };
};
const setUser = (state, action) => {
  return {
    ...state,
    user: action.payload,
  };
};

export default createReducer(INITIAL_STATE_GLOBAL, {
  [LOADING]: setLoading,
  [ERROR]: setError,
  [SET_USER]: setUser,
});
