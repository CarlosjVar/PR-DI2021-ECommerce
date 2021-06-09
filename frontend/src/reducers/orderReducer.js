import {
  GET_ORDERS,
  GET_ORDER_DETAILS,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  SET_ORDER_LOADING,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
} from '../constants/orderConstants';

const initialState = {
  orderList: [],
  orderDetails: {},
  loading: false,
};

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orderList: payload,
      };
    case GET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: payload,
      };
    case SET_ORDER_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderList: [payload, ...state.orderList],
      };
    case CREATE_ORDER_FAILURE:
    case UPDATE_ORDER_STATUS_SUCCESS:
    case UPDATE_ORDER_STATUS_FAILURE:
    default:
      return state;
  }
};

export default orderReducer;
