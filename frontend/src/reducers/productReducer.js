import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  GET_PRODUCTS,
  GET_PRODUCT_DETAILS,
  SET_PRODUCT_LOADING,
  DELETE_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  CLEAR_PRODUCT_LIST,
  SET_SEARCHED_PRODUCT_NAME,
  SET_SEARCHED_PRODUCT_CATEGORY,
} from '../constants/productConstants';

const initialState = {
  productList: [],
  searchedProductName: '',
  searchedCategoryName: 'All',
  productDetails: {},
  loading: false,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PRODUCT_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case CLEAR_PRODUCT_LIST:
      return {
        ...state,
        productList: [],
      };
    case GET_PRODUCTS:
      return {
        ...state,
        productList: payload,
      };
    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: [payload, ...state.productList],
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: [
          payload,
          ...state.productList.filter((product) => product.id !== payload.id),
        ],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productList: state.productList.filter(
          (product) => product.id !== payload
        ),
      };
    case SET_SEARCHED_PRODUCT_NAME:
      return {
        ...state,
        searchedProductName: payload,
      };
    case SET_SEARCHED_PRODUCT_CATEGORY:
      return {
        ...state,
        searchedCategoryName: payload,
      };
    case EDIT_PRODUCT_FAILURE:
    case ADD_PRODUCT_FAILURE:
    default:
      return state;
  }
};

export default productReducer;
