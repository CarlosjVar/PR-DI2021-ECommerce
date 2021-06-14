import {
  GET_INITIAL_PRODUCTS,
  ADD_SELECTED_PRODUCT,
  REMOVE_SELECTED_PRODUCT,
  SET_PC_BUILDER_LOADING,
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
