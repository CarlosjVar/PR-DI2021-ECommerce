import {
  ADD_PRODUCT_TO_CART,
  SET_CART_LOADING,
} from '../constants/cartConstants';
import api from '../utils/api';

/**
 * Adds a product to the cart
 * @param {object} cartData The cart data
 */
export const addProductToCart = (productData) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_TO_CART, payload: productData });
  if (localStorage.getItem('cart')) {
    // Add product to cart in local storage
    let cartStorage = JSON.parse(localStorage.getItem('cart'));
    cartStorage = [productData.id, ...cartStorage];
    localStorage.setItem('cart', JSON.stringify(cartStorage));
  } else {
    // Create cart storage
    localStorage.setItem('cart', JSON.stringify([productData.id]));
  }
};
