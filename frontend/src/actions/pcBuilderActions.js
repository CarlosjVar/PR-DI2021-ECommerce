import {
  GET_INITIAL_PRODUCTS,
  SET_PC_BUILDER_LOADING,
  ADD_SELECTED_PRODUCT,
  REMOVE_SELECTED_PRODUCT,
  CLEAR_PC_BUILDER_PRODUCTS,
  GET_SUGGESTED_MOTHERBOARD,
  GET_ALL_CATEGORY_PRODUCTS,
  GET_SUGGESTED_COOLER,
  GET_SUGGESTED_MEMORY,
} from '../constants/pcBuilderConstants';
import api from '../utils/api';

/**
 * Gets the initial products for the pc builder
 * @param {object} componentCategories The component categories and their names
 */
export const getInitialProducts = (componentCategories) => async (dispatch) => {
  dispatch({ type: SET_PC_BUILDER_LOADING });
  try {
    let initialProducts = {};
    for (let categoryName in componentCategories) {
      const { data } = await api.get(
        `/api/products/getAll?category=${componentCategories[categoryName]}`
      );
      initialProducts[categoryName] = data.products;
    }
    dispatch({ type: GET_INITIAL_PRODUCTS, payload: initialProducts });
    dispatch({ type: SET_PC_BUILDER_LOADING });
  } catch (error) {
    console.error(error);
  }
};

export const getAllCategoryProducts =
  (categoryKey, categoryName) => async (dispatch) => {
    try {
      dispatch({ type: SET_PC_BUILDER_LOADING });
      const { data } = await api.get(
        `/api/products/getAll?category=${categoryName}`
      );
      dispatch({
        type: GET_ALL_CATEGORY_PRODUCTS,
        payload: { products: data.products, categoryKey },
      });
      dispatch({ type: SET_PC_BUILDER_LOADING });
    } catch (error) {
      console.error(error);
    }
  };

export const getSuggestedMotherboards = (specValue) => async (dispatch) => {
  try {
    dispatch({ type: SET_PC_BUILDER_LOADING });
    const { data } = await api.get(
      `/api/products/pcBuilder/getProducts/4/2/${specValue}`
    );
    dispatch({ type: GET_SUGGESTED_MOTHERBOARD, payload: data.prods });
    dispatch({ type: SET_PC_BUILDER_LOADING });
  } catch (error) {
    console.error(error);
  }
};

export const getSuggestedMemories = (specValue) => async (dispatch) => {
  try {
    dispatch({ type: SET_PC_BUILDER_LOADING });
    const { data } = await api.get(
      `/api/products/pcBuilder/getProducts/3/3/${specValue}`
    );
    dispatch({ type: GET_SUGGESTED_MEMORY, payload: data.prods });
    dispatch({ type: SET_PC_BUILDER_LOADING });
  } catch (error) {
    console.error(error);
  }
};

export const getSuggestedCoolers = (specValue) => async (dispatch) => {
  try {
    dispatch({ type: SET_PC_BUILDER_LOADING });
    const { data } = await api.get(
      `/api/products/pcBuilder/getProducts/5/2/${specValue}`
    );
    dispatch({ type: GET_SUGGESTED_COOLER, payload: data.prods });
    dispatch({ type: SET_PC_BUILDER_LOADING });
  } catch (error) {
    console.error(error);
  }
};

export const clearPCBuilderProducts = () => async (dispatch) => {
  dispatch({ type: CLEAR_PC_BUILDER_PRODUCTS });
};

export const addPCBuilderProduct = (product) => async (dispatch) => {
  dispatch({ type: ADD_SELECTED_PRODUCT, payload: product });
};

export const removePCBuilderProduct = (productId) => async (dispatch) => {
  dispatch({ type: REMOVE_SELECTED_PRODUCT, payload: productId });
};
