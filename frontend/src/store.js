import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import setAuthenticationToken from './utils/setAuthenticationToken';

import authReducer from './reducers/authReducer';
import alertReducer from './reducers/alertReducer';
import adminReducer from './reducers/adminReducer';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import specificationReducer from './reducers/specificationReducer';
import cartReducer from './reducers/cartReducer';

const reducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  admin: adminReducer,
  product: productReducer,
  category: categoryReducer,
  specification: specificationReducer,
  cart: cartReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Get initial state of the store
let currentState = store.getState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  // Check if new token or removed
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthenticationToken(token);
  }
});

export default store;
