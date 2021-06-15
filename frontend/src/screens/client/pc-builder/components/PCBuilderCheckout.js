import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';

const PCBuilderCheckout = ({ selectedProducts }) => {
  const dispatch = useDispatch();

  const [orderType, setOrderType] = useState('sale');

  // Calculate total price
  let subtotalPrice = 0;
  selectedProducts.forEach((product) => {
    subtotalPrice += parseFloat(product.price);
  });
  // Calculate total price
  const taxes = subtotalPrice * 0.13;
  const totalPrice = subtotalPrice + taxes;

  return (
    <>
      <p className="mt-3 mb-4" style={{ fontSize: '17px' }}>
        <strong>Precio total: </strong>{' '}
        <NumberFormat
          value={totalPrice}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          isNumericString={false}
          prefix={'₡'}
        />
      </p>
      <hr />
      <h4 className="mt-4">Tipo de Orden</h4>
      <Form.Control
        name="orderType"
        className="my-3"
        disabled={selectedProducts.length < 8}
        value={orderType}
        onChange={(e) => setOrderType(e.target.value)}
        as="select"
      >
        <option value="sale">Venta</option>
        <option value="preorder">Preorden</option>
      </Form.Control>
      <Button
        disabled={selectedProducts.length < 8}
        className="btn-primary btn-block"
      >
        Continuar y procesar orden
      </Button>
    </>
  );
};

PCBuilderCheckout.propTypes = {
  selectedProducts: PropTypes.array.isRequired,
};

export default PCBuilderCheckout;
