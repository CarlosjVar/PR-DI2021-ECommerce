import { SHOW_ALERT, REMOVE_ALERT } from '../constants/alertConstants';

const initialState = [];

/**
 * Reducer for alert state
 * @param {object} state The initial state of alert
 * @param {object} action The action data
 * @returns The new alert state
 */
const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default alertReducer;
