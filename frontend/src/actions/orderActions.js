import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from '../constants/orderConstants';
import { showAlert } from './alertActions';
import { clearCart } from './cartActions';
import api from '../utils/api';

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