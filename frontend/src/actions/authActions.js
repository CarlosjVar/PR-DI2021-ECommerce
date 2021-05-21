import api from '../utils/api';
import {
  LOGOUT,
  LOAD_USER,
  LOAD_USER_SUCCESS,
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
 * @returns
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
