import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Image, Row, Col, Form, Button } from 'react-bootstrap';
import {
  updateCartProductQuantity,
  removeProductFromCart,
} from '../../../../actions/cartActions';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const ShoppingCartItem = ({ productInfo }) => {
  const { id, name, imageFileName, price, quantity, numberOfItems } =
    productInfo;

  const dispatch = useDispatch();

  const [selectedNumberOfItems, setSelectedNumberOfItems] = useState('1');

  useEffect(() => {
    setSelectedNumberOfItems(numberOfItems.toString());
  }, [numberOfItems]);

  // Create dropdown for product quantities
  let quantityOptions = [];
  for (let i = 1; i <= quantity; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const onNumberOfItemsChange = (selectedNumber) => {
    dispatch(updateCartProductQuantity(id, parseInt(selectedNumber)));
    setSelectedNumberOfItems(selectedNumber);
  };

  const onRemoveClick = () => dispatch(removeProductFromCart(id));

  // Calculate price for product
  const itemPrice = parseInt(selectedNumberOfItems) * parseFloat(price);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col md="3">
            <div className="product-card-img-container">
              <Image
                style={{ maxHeight: '128px', maxWidth: '128px' }}
                src={
                  imageFileName === 'default_img' || !imageFileName
                    ? '/img/placeholder-image.jpg'
                    : `/api/utils/image/${imageFileName}`
                }
                fluid
              />
            </div>
          </Col>
          <Col md="9">
            <h5>{name}</h5>
            <Row className="mt-4">
              <Col md="4">
                <p className="mt-2" style={{ marginBottom: '0' }}>
                  Precio:{' '}
                  <NumberFormat
                    value={itemPrice}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    isNumericString={false}
                    prefix={'₡'}
                  />
                </p>
              </Col>
              <Col md="8">
                <Form.Group as={Row} controlId="quantity">
                  <Form.Label column sm={4}>
                    Cantidad:
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control
                      name="quantity"
                      value={selectedNumberOfItems}
                      onChange={(e) => onNumberOfItemsChange(e.target.value)}
                      as="select"
                    >
                      {quantityOptions}
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex align-items-center" md="5">
                <p style={{ marginBottom: '0' }}>
                  <Link className="link" to={`/products/${id}`}>
                    Informacion del producto
                  </Link>
                </p>
              </Col>
              <Col md="4">
                <Button
                  onClick={onRemoveClick}
                  className="btn-danger btn-block"
                >
                  Eliminar
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

ShoppingCartItem.propTypes = {
  productInfo: PropTypes.object.isRequired,
};

export default ShoppingCartItem;
