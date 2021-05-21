import { SHOW_ALERT, REMOVE_ALERT } from '../constants/alertConstants';
import { v4 as uuidv4 } from 'uuid';

/**
 * Shows an alert
 * @param {object} alertData The data of the alert
 * @returns nothing
 */
export const showAlert = (alertData) => (dispatch) => {
  const alertId = uuidv4();
  dispatch({ type: SHOW_ALERT, payload: { ...alertData, id: alertId } });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: alertId }), 3000);
};
