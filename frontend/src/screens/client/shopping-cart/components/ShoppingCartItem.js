import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Row, Col } from 'react-bootstrap';
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
            <p className="mt-3">'categoria</p>
            <p>
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
            <p style={{ marginBottom: '0' }}>
              <Link className="link" to={`/products/${id}`}>
                Informacion del producto
              </Link>
            </p>
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
