import {
  ADD_PRODUCT_TO_CART,
  SET_CART_LOADING,
  SET_CART_PRODUCTS,
  UPDATE_PRODUCT_QUANTITY,
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
      if (data.product.quantity > 0) {
        cartProducts.push({
          ...data.product,
          numberOfItems: cartItem.numberOfItems,
        });
      }
    }
    // Set cart products again in case of out of stock
    localStorage.setItem(
      'cart',
      JSON.stringify(
        cartProducts.map((product) => ({
          id: product.id,
          numberOfItems: product.numberOfItems,
        }))
      )
    );
    dispatch({ type: SET_CART_PRODUCTS, payload: cartProducts });
    dispatch({ type: SET_CART_LOADING });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Updates the quantity of a product in the cart
 * @param {number} productId The id of the product
 * @param {number} numberOfItems The new number of items
 */
export const updateCartProductQuantity =
  (productId, numberOfItems) => async (dispatch) => {
    dispatch({
      type: UPDATE_PRODUCT_QUANTITY,
      payload: { id: productId, numberOfItems },
    });
    // Update local storage
    let cartProducts = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].id === productId) {
        cartProducts[i].numberOfItems = numberOfItems;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  };
