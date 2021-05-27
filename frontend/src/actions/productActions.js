import api from '../utils/api';
import {
  GET_PRODUCTS,
  SET_PRODUCT_LOADING,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
} from '../constants/productConstants';
import { showAlert } from './alertActions';

/**
 * Gets all of the current products
 */
export const getProducts = () => async (dispatch) => {
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

/**
 * Add a new product
 * @param {object} productData Product data
 * @param {object} history History object
 */
export const addProduct = (productData, history) => async (dispatch) => {
  try {
    const { data } = await api.post('/api/products/create', productData);
    const { productInfo } = data;

    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: productInfo });
    dispatch(showAlert({ message: 'Producto agregado', type: 'success' }));
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_FAILURE });
    error.response.data.errors.forEach((error) =>
      dispatch(showAlert({ message: error.msg, type: 'danger' }))
    );
  }
};

/**
 * Deletes a product
 * @param {number} productId The product id
 */
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: SET_PRODUCT_LOADING });
    await api.delete(`/api/products/delete?prodId=${productId}`);
    dispatch({ type: DELETE_PRODUCT, payload: productId });
    dispatch({ type: SET_PRODUCT_LOADING });
    dispatch(showAlert({ message: 'Producto eliminado', type: 'success' }));
  } catch (error) {
    console.error(error);
  }
};
