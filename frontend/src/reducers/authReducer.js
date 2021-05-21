import {
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT,
  REGISTER_CLIENT_FAILURE,
  REGISTER_CLIENT_SUCCESS,
} from '../constants/authConstants';

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  token: localStorage.getItem('token'),
};

/**
 * Reducer for authentication state
 * @param {object} state The initial state of authentication
 * @param {object} action The action data
 * @returns The new authentication state
 */
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
      };
    case LOAD_USER:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case REGISTER_CLIENT_SUCCESS:
    case REGISTER_CLIENT_FAILURE:
    case LOAD_USER_FAILURE:
    case AUTH_USER_FAILURE:
    default:
      return state;
  }
};

export default authReducer;
