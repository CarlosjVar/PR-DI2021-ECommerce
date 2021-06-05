import {
  ADD_PRODUCT_TO_CART,
  SET_CART_LOADING,
  SET_CART_PRODUCTS,
} from '../constants/cartConstants';

const initialState = {
  products: [],
  loading: false,
};
const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CART_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case SET_CART_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: [payload, ...state.products],
      };
    default:
      return state;
  }
};

export default cartReducer;
