import {
  ADD_PRODUCT_TO_CART,
  SET_CART_LOADING,
  SET_CART_PRODUCTS,
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

/**
 * Loads all of the products to cart in the store
 * @param {array} productIds An array of product ids
 */
export const loadCartProducts = (productIds) => async (dispatch) => {
  try {
    dispatch({ type: SET_CART_LOADING });
    let cartProducts = [];
    // Load product data
    for (let productId of productIds) {
      const { data } = await api.get(`/api/products/get/${productId}`);
      cartProducts.push(data.product);
    }
    dispatch({ type: SET_CART_PRODUCTS, payload: cartProducts });
    dispatch({ type: SET_CART_LOADING });
  } catch (error) {
    console.error(error);
  }
};
