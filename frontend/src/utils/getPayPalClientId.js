import api from './api';

/**
 * Gets the paypal client id
 * @returns The paypal client id
 */
const getPayPalClientId = async () => {
  try {
    const { data } = await api.get('/api/config/paypal');
    const { paypalClientId } = data;
    return paypalClientId;
  } catch (error) {
    console.error(error);
  }
};

export default getPayPalClientId;
