import React from 'react';
import { ListGroup, Form, Col, Button, Row } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const AddToCart = ({ productInfo }) => {
  const { price, quantity } = productInfo;

  // Create dropdown for product quantities
  let quantityOptions = [];
  for (let i = 1; i < quantity; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <ListGroup>
      <ListGroup.Item>
        Precio:{' '}
        <NumberFormat
          value={price}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          isNumericString={true}
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
            <Form.Control name="quantity" as="select">
              {quantityOptions}
            </Form.Control>
          </Col>
        </Form.Group>
      </ListGroup.Item>
      <ListGroup.Item>
        <Button className="btn-secondary btn-block">
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
