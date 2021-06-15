import {
  GET_INITIAL_PRODUCTS,
  SET_PC_BUILDER_LOADING,
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
