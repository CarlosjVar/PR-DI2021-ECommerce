import api from '../utils/api';
import {
  GET_ADMINS,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_ADMIN_FAILURE,
} from '../constants/adminConstants';

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
