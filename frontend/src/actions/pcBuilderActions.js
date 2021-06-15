import {
  GET_INITIAL_PRODUCTS,
  SET_PC_BUILDER_LOADING,
  ADD_SELECTED_PRODUCT,
  REMOVE_SELECTED_PRODUCT,
  CLEAR_PC_BUILDER_PRODUCTS,
  GET_SUGGESTED_MOTHERBOARD,
  GET_SUGGESTED_MEMORY,
  GET_SUGGESTED_COOLER,
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

export const getAllMotherboards = () => async (dispatch) => {
  dispatch({ type: SET_PC_BUILDER_LOADING });
};

export const getSuggestedMotherboard = (specValue) => async (dispatch) => {
  dispatch({ type: SET_PC_BUILDER_LOADING });
  try {
    const { data } = await api.get(
      `/api/products/pcBuilder/getProducts/4/2/${specValue}`
    );
    dispatch({ type: GET_SUGGESTED_MOTHERBOARD, payload: data.prods });
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
