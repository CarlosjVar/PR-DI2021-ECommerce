import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const OrderPriceInfo = ({ products, order }) => {
  let subtotalPrice = 0;
  products.forEach((product) => {
    subtotalPrice += parseFloat(product.price) * product.quantity;
  });

  const taxes = subtotalPrice * 0.13;

  const totalPrice = subtotalPrice + taxes;

  return (
    <div className="cart-information">
      <div className="cart-information-header">
        <h5>Información de la Orden</h5>
      </div>
      <div className="cart-information-prices">
        <p>
          <strong>Tipo de orden: </strong> {order.Sales ? 'Venta' : 'Preorden'}
        </p>
        <p>
          <strong>Subtotal:</strong>{' '}
          <NumberFormat
            value={subtotalPrice}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            isNumericString={false}
            prefix={'₡'}
          />
        </p>
        <p style={{ marginTop: 0 }}>
          <strong>Impuestos:</strong>{' '}
          <NumberFormat
            value={taxes}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            isNumericString={false}
            prefix={'₡'}
          />
        </p>
      </div>
      <div className="cart-information-total-price">
        <p>
          <strong>Total:</strong>{' '}
          <NumberFormat
            value={totalPrice}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            isNumericString={false}
            prefix={'₡'}
          />
        </p>
      </div>
    </div>
  );
};

OrderPriceInfo.propTypes = {
  order: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};

export default OrderPriceInfo;
