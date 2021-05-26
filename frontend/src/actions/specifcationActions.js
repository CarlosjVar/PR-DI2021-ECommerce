import api from '../utils/api';
import { GET_SPECIFICATIONS } from '../constants/specificationConstants';

/**
 * Gets all of the specifications
 */
export const getSpecifications = () => async (dispatch) => {
  try {
    const { data } = await api.get('/api/utils/specs');
    const { specs } = data;
    dispatch({ type: GET_SPECIFICATIONS, payload: specs });
  } catch (error) {
    console.error(error);
  }
};
