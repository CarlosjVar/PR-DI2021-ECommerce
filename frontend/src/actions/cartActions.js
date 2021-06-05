import {
  ADD_PRODUCT_TO_CART,
  SET_CART_LOADING,
  SET_CART_PRODUCTS,
} from '../constants/cartConstants';
import api from '../utils/api';

/**
 * Adds a new product to the cart
 * @param {object} productData The data of the product
 * @param {number} numberOfItems Number of items of the products
 */
export const addProductToCart =
  (productData, numberOfItems = 1) =>
  async (dispatch) => {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: { ...productData, numberOfItems },
    });
    if (localStorage.getItem('cart')) {
      // Add product to cart in local storage
      let cartStorage = JSON.parse(localStorage.getItem('cart'));
      cartStorage = [{ id: productData.id, numberOfItems }, ...cartStorage];
      localStorage.setItem('cart', JSON.stringify(cartStorage));
    } else {
      // Create cart storage
      localStorage.setItem(
        'cart',
        JSON.stringify([{ id: productData.id, numberOfItems }])
      );
    }
  };

/**
 * Loads all of the products to cart in the store
 * @param {array} cartItems An array of cart items
 */
export const loadCartProducts = (cartItems) => async (dispatch) => {
  try {
    dispatch({ type: SET_CART_LOADING });
    let cartProducts = [];
    // Load product data
    for (let cartItem of cartItems) {
      const { data } = await api.get(`/api/products/get/${cartItem.id}`);
      cartProducts.push({
        ...data.product,
        numberOfItems: cartItem.numberOfItems,
      });
    }
    dispatch({ type: SET_CART_PRODUCTS, payload: cartProducts });
    dispatch({ type: SET_CART_LOADING });
  } catch (error) {
    console.error(error);
  }
};
