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

export const registerClient = (clientData, history) => async (dispatch) => {
  try {
    const { data } = await api.post('/api/clients/create', clientData);
    console.log(data);
    dispatch(
      showAlert({ message: 'Se ha registrado con éxito', type: 'success' })
    );
    history.push('/login');
  } catch (error) {
    console.log(error.response.data.errors);
  }
};
