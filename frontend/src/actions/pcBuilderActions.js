import {
  GET_INITIAL_PRODUCTS,
  SET_PC_BUILDER_LOADING,
} from '../constants/pcBuilderConstants';
import { getCategories } from './categoryActions';
import api from '../utils/api';

/**
 * Gets the initial products for pc builder
 */
export const getInitialProducts = () => async (dispatch, getState) => {
  dispatch({ type: SET_PC_BUILDER_LOADING });
  await dispatch(getCategories());
  const categoryNames = getState().category.categoryList.map(
    (category) => category.name
  );
  try {
    let initialProducts = {};
    // TODO: Change this after backend fix
    for (let categoryName of categoryNames) {
      const { data } = await api.get(
        `/api/products/getAll?category=${categoryName}`
      );
      initialProducts[categoryName] = data.products;
    }
    dispatch({ type: GET_INITIAL_PRODUCTS, payload: initialProducts });
    dispatch({ type: SET_PC_BUILDER_LOADING });
  } catch (error) {
    console.error(error);
  }
};
