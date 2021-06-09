import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDERS,
  GET_ORDER_DETAILS,
  SET_ORDER_LOADING,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_SUCCESS,
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
 * Gets a single order
 * @param {number} orderId The id of the order
 */
export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: SET_ORDER_LOADING });
    const { data } = await api.get(`/api/orders/get/${orderId}`);
    dispatch({
      type: GET_ORDER_DETAILS,
      payload: {
        order: data.orden,
        client: data.cliente,
        products: data.detallesOrder,
      },
    });
    dispatch({ type: SET_ORDER_LOADING });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Gets the list of orders of a single client
 */
export const getClientOrders = () => async (dispatch) => {
  try {
    dispatch({ type: SET_ORDER_LOADING });
    const { data } = await api.get('/api/orders/getOrdersClient');
    const { orders } = data;
    dispatch({ type: GET_ORDERS, payload: orders });
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

/**
 * Updates the order status
 * @param {object} orderData The current data of the order
 * @param {object} orderStatus The new status of the order
 * @param {object} history The router history object
 */
export const updateOrderStatus =
  (orderData, orderStatus, history) => async (dispatch) => {
    try {
      const { id } = orderData;
      await api.put(`/api/orders/updateStatus/${id}`, orderStatus);
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS });
      dispatch(
        showAlert({
          message: 'El estado de la orden fue actuailizado correctamente',
          type: 'success',
        })
      );
      history.push(`/admin/orders/${id}`);
    } catch (error) {
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE });
      dispatch(showAlert({ message: error.response.data.msg, type: 'danger' }));
    }
  };
