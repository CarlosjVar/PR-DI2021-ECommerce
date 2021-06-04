import React, { useState, useEffect } from 'react';
import { ListGroup, Form, Col, Button, Row } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const AddToCart = ({ productInfo }) => {
  const { price, quantity } = productInfo;

  const [productQuantity, setProductQuantity] = useState('1');

  useEffect(() => {
    setProductQuantity(quantity === '0' ? '0' : '1');
  }, [quantity]);

  // Create dropdown for product quantities
  let quantityOptions = [];
  for (let i = 1; i < quantity; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const onAddToCartClick = () => {
    console.log('adding to cart...');
  };

  const estimatedPrice = parseInt(productQuantity) * parseFloat(price);

  return (
    <ListGroup className="mt-4">
      <ListGroup.Item>
        Precio:{' '}
        <NumberFormat
          value={estimatedPrice}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          isNumericString={false}
          prefix={'₡'}
        />
      </ListGroup.Item>
      <ListGroup.Item>
        Estado: {quantity > 0 ? 'En stock' : 'No disponibles'}
      </ListGroup.Item>
      <ListGroup.Item style={{ paddingBottom: '0.01rem' }}>
        <Form.Group as={Row} controlId="quantity">
          <Form.Label column sm={3}>
            Cantidad:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="quantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              as="select"
            >
              {quantityOptions}
            </Form.Control>
          </Col>
        </Form.Group>
      </ListGroup.Item>
      <ListGroup.Item>
        <Button
          disabled={quantity === 0}
          onClick={onAddToCartClick}
          className="btn-secondary btn-block"
        >
          <i className="fas fa-cart-plus"></i> Agregar al carrito
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
};

AddToCart.propTypes = {
  productInfo: PropTypes.object.isRequired,
};

export default AddToCart;
