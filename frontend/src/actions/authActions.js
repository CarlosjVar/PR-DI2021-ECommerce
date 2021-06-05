import api from '../utils/api';
import {
  LOGOUT,
  LOAD_USER,
  LOAD_USER_SUCCESS,
  AUTH_USER_SUCCESS,
} from '../constants/authConstants';
import { showAlert } from './alertActions';

/**
 * Logs a user out
 */
export const logoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};

/**
 * Registers a new client
 * @param {object} clientData Data of the client to register
 * @param {object} history React router history
 */
export const registerClient = (clientData, history) => async (dispatch) => {
  try {
    await api.post('/api/clients/create', clientData);
    dispatch(
      showAlert({ message: 'Se ha registrado con éxito', type: 'success' })
    );
    history.push('/login');
  } catch (error) {
    error.response.data.errors.forEach((error) =>
      dispatch(showAlert({ message: error.msg, type: 'danger' }))
    );
  }
};

/**
 * Loads the user data
 * @param {object} history The history object
 */
export const loadUser = (history) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER });
    const { data } = await api.get('/api/users/current');
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
    if (data.isAdmin) {
      history.push('/dashboard');
    } else {
      history.push('/');
    }
  } catch (error) {}
};

/**
 * Authenticates a user
 * @param {object} authData Authentication data
 * @param {object} history React router history
 */
export const authenticateUser = (authData, history) => async (dispatch) => {
  try {
    const { data } = await api.post('/api/auth/authUser', authData);
    dispatch({
      type: AUTH_USER_SUCCESS,
      payload: data.token,
    });
    dispatch(loadUser(history));
    dispatch(showAlert({ message: 'Ha ingresado con éxito', type: 'success' }));
    history.push('/');
  } catch (error) {
    error.response.data.errors.forEach((error) =>
      dispatch(showAlert({ message: error.msg, type: 'danger' }))
    );
  }
};
