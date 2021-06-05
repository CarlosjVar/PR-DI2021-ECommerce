import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Row, Col, Form, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const ShoppingCartItem = ({ productInfo }) => {
  const { id, name, imageFileName, price } = productInfo;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col md="3">
            <div className="product-card-img-container">
              <Image
                style={{ maxHeight: '128px', maxWidth: '128px' }}
                src={`/api/utils/image/${imageFileName}`}
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
                    value={price}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    isNumericString={true}
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
                    <Form.Control name="quantity" as="select">
                      <option value="1">1</option>
                      <option value="1">1</option>
                      <option value="1">1</option>
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
                <Button className="btn-danger btn-block">Eliminar</Button>
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
