import api from '../utils/api';
import {
  GET_ADMINS,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_ADMIN_FAILURE,
} from '../constants/adminConstants';
import { showAlert } from './alertActions';

/**
 * Gets all of the registered admins
 */
export const getAdmins = () => async (dispatch) => {
  try {
    const { data } = await api.get('/api/admins/get');
    dispatch({ type: GET_ADMINS, payload: data.admins });
  } catch (error) {
    console.error('Internal server error');
  }
};

/**
 * Registers a new admin
 * @param {object} adminData The admin data
 * @param {object} history React router history
 * @returns
 */
export const registerAdmin = (adminData, history) => async (dispatch) => {
  try {
    await api.post('/api/admins/create', adminData);
    dispatch({ type: REGISTER_ADMIN_SUCCESS, payload: adminData });
    dispatch(
      showAlert({ message: 'Administrador registrado', type: 'success' })
    );
    history.push('/admins');
  } catch (error) {
    dispatch({ type: REGISTER_ADMIN_FAILURE });
    error.response.data.errors.forEach((error) =>
      dispatch(showAlert({ message: error.msg, type: 'danger' }))
    );
  }
};
