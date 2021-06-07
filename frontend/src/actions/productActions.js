import api from '../utils/api';
import {
  GET_PRODUCTS,
  SET_PRODUCT_DETAILS_LOADING,
  SET_PRODUCT_LIST_LOADING,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
  GET_PRODUCT_DETAILS,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  CLEAR_PRODUCT_LIST,
  SET_SEARCHED_PRODUCT_NAME,
  SET_SEARCHED_PRODUCT_CATEGORY,
} from '../constants/productConstants';
import { showAlert } from './alertActions';

/**
 * Gets all of the current products
 */
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: SET_PRODUCT_LIST_LOADING });
    const { data } = await api.get('/api/products/getAll');
    const { products } = data;
    dispatch({ type: GET_PRODUCTS, payload: products });
    dispatch({ type: SET_PRODUCT_LIST_LOADING });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Gets products by name and category
 * @param {string} name The name of the product
 * @param {string} category The category of the product
 */
export const getProductsByNameAndCategory =
  (name, categoryName) => async (dispatch) => {
    dispatch({ type: SET_SEARCHED_PRODUCT_NAME, payload: name });
    dispatch({ type: SET_SEARCHED_PRODUCT_CATEGORY, payload: categoryName });
    try {
      dispatch({ type: SET_PRODUCT_LIST_LOADING });
      const { data } = await api.get(
        `/api/products/getAll?category=${categoryName}&productName=${name}`
      );
      const { products } = data;
      dispatch({ type: GET_PRODUCTS, payload: products });
      dispatch({ type: SET_PRODUCT_LIST_LOADING });
    } catch (error) {
      console.error(error);
    }
  };

/**
 * Gets products by name and category
 * @param {string} categoryName The category of the product
 */
export const getProductsByCategory = (categoryName) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_PRODUCT_LIST });
    dispatch({ type: SET_PRODUCT_LIST_LOADING });
    const { data } = await api.get(
      `/api/products/getAll?category=${categoryName}`
    );
    const { products } = data;
    dispatch({ type: GET_PRODUCTS, payload: products });
    dispatch({ type: SET_PRODUCT_LIST_LOADING });
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
    dispatch({ type: SET_PRODUCT_LIST_LOADING });
    await api.delete(`/api/products/delete?prodId=${productId}`);
    dispatch({ type: DELETE_PRODUCT, payload: productId });
    dispatch({ type: SET_PRODUCT_LIST_LOADING });
    dispatch(showAlert({ message: 'Producto eliminado', type: 'success' }));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Gets a single product
 * @param {number} productId The product id
 */
export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: SET_PRODUCT_DETAILS_LOADING });
    const { data } = await api.get(`/api/products/get/${productId}`);
    const { product } = data;
    dispatch({ type: GET_PRODUCT_DETAILS, payload: product });
    dispatch({ type: SET_PRODUCT_DETAILS_LOADING });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Edits a single product
 * @param {object} productData The new product data
 * @param {object} history The react history
 */
export const editProduct =
  (productData, productId, history) => async (dispatch) => {
    try {
      const { data } = await api.put(
        `/api/products/update?productId=${productId}`,
        productData
      );
      const { productInfo } = data;
      dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: productInfo });
      dispatch(showAlert({ message: 'Producto editado', type: 'success' }));
      history.push('/dashboard');
    } catch (error) {
      dispatch({ type: EDIT_PRODUCT_FAILURE });
      console.log(error.response.data);
      error.response.data.errors.forEach((error) =>
        dispatch(showAlert({ message: error.msg, type: 'danger' }))
      );
    }
  };
