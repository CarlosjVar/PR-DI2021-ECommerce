import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDERS,
  SET_ORDER_LOADING,
} from '../constants/orderConstants';
import { showAlert } from './alertActions';
import { clearCart } from './cartActions';
import api from '../utils/api';

/**
 * Gets all of the registered orders
 */
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: SET_ORDER_LOADING });
    const { data } = await api.get('/api/orders/getOrdersAdmin');
    const { ordenes } = data;
    dispatch({ type: GET_ORDERS, payload: ordenes });
    dispatch({ type: SET_ORDER_LOADING });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Creates a new preorder
 * @param {object} preorderData The data of the preorder
 * @param {object} history The history object of the router
 */
export const createPreorder = (preorderData, history) => async (dispatch) => {
  try {
    const { data } = await api.post('/api/orders/createPreorder', preorderData);
    const { prodsOrder, order, msg } = data;
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: { prodsOrder, order } });
    dispatch(clearCart());
    dispatch(showAlert({ message: msg, type: 'success' }));
    history.push('/cart');
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE });
    error.response.data.errors.forEach((error) =>
      dispatch(showAlert({ message: error.msg, type: 'danger' }))
    );
  }
};

/**
 * Creates a new sale
 * @param {object} saleData The data of the sale
 * @param {object} history The history object of the router
 */
export const createSale = (saleData, history) => async (dispatch) => {
  try {
    const { data } = await api.post('/api/orders/createSale', saleData);
    const { prodsOrder, order, msg } = data;
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: { prodsOrder, order } });
    dispatch(clearCart());
    dispatch(showAlert({ message: msg, type: 'success' }));
    history.push('/cart');
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE });
    error.response.data.errors.forEach((error) =>
      dispatch(showAlert({ message: error.msg, type: 'danger' }))
    );
  }
};
