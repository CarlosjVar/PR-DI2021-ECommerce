import {
  ADD_PRODUCT_TO_CART,
  SET_CART_LOADING,
  SET_CART_PRODUCTS,
  UPDATE_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_FROM_CART,
  CLEAR_CART,
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
    case CLEAR_CART:
      return {
        ...state,
        products: [],
      };
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: [payload, ...state.products],
      };
    case UPDATE_PRODUCT_QUANTITY:
      const { id, numberOfItems } = payload;
      let newProducts = state.products;
      newProducts.forEach((product, index) => {
        if (product.id === id) {
          newProducts[index].numberOfItems = numberOfItems;
        }
      });
      return {
        ...state,
        products: newProducts,
      };
    case REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
