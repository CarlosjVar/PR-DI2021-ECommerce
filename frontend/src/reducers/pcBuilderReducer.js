import {
  GET_INITIAL_PRODUCTS,
  ADD_SELECTED_PRODUCT,
  REMOVE_SELECTED_PRODUCT,
  SET_PC_BUILDER_LOADING,
  CLEAR_PC_BUILDER_PRODUCTS,
  GET_SUGGESTED_MOTHERBOARD,
  GET_SUGGESTED_MEMORY,
  GET_SUGGESTED_COOLER,
  GET_ALL_CATEGORY_PRODUCTS,
} from '../constants/pcBuilderConstants';

const initialState = {
  products: {},
  selectedProducts: [],
  loading: false,
};

const pcBuilderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_INITIAL_PRODUCTS:
      return {
        ...state,
        products: { ...payload },
      };
    case CLEAR_PC_BUILDER_PRODUCTS:
      return {
        ...state,
        products: {},
        selectedProducts: [],
      };
    case GET_ALL_CATEGORY_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          [payload.categoryKey]: payload.products,
        },
      };
    case GET_SUGGESTED_MOTHERBOARD:
      return {
        ...state,
        products: { ...state.products, motherboard: payload },
      };
    case GET_SUGGESTED_MEMORY:
      return {
        ...state,
        products: { ...state.products, memory: payload },
      };
    case GET_SUGGESTED_COOLER:
      return {
        ...state,
        products: { ...state.products, cooler: payload },
      };
    case SET_PC_BUILDER_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case ADD_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProducts: [payload, ...state.selectedProducts],
      };
    case REMOVE_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(
          (product) => product.id !== payload
        ),
      };
    default:
      return state;
  }
};

export default pcBuilderReducer;
