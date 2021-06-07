import axios from 'axios';

const getCurrentExchange = async (totalPrice) => {
  try {
    const { data } = await axios.get('https://tipodecambio.paginasweb.cr/api');
    return (totalPrice / data.venta).toFixed(2);
  } catch (error) {
    console.error(error);
  }
};

export default getCurrentExchange;
