import api from '../utils/api';
import {
  GET_PRODUCTS,
  SET_PRODUCT_LOADING,
} from '../constants/productConstants';

/**
 * Gets all of the current products
 */
export const getProducts = () => (dispatch) => {
  try {
    dispatch({ type: SET_PRODUCT_LOADING });
    const { data } = await api.get('/api/products/get');
    const { products } = data;
    dispatch({ type: GET_PRODUCTS, payload: products });
    dispatch({ type: SET_PRODUCT_LOADING });
  } catch (error) {
    console.error(error);
  }
};
