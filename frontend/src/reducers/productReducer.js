import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  GET_PRODUCTS,
} from '../constants/productConstants';

const initialState = {
  productList: [],
  productDetails: {},
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        productList: payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: [payload, ...state.productList],
      };
    case ADD_PRODUCT_FAILURE:
    default:
      return state;
  }
};

export default productReducer;
