import api from '../utils/api';
import { GET_CATEGORIES } from '../constants/categoryConstants';

/**
 * Gets all of the categories
 */
export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await api.get('/api/utils/categories');
    const { categories } = data;
    dispatch({ type: GET_CATEGORIES, payload: categories });
  } catch (error) {
    console.error(error);
  }
};
