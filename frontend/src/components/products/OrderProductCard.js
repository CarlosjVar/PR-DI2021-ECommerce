import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Image, Row, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const OrderProductCard = ({ product }) => {
  const { isAdmin } = useSelector((state) => state.auth);

  const { imageFileName, price, name, quantity, productId } = product;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col lg="3">
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
          <Col lg="9">
            <h4>{name}</h4>
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
                <p className="mt-2" style={{ marginBottom: '0' }}>
                  Cantidad: {quantity}
                </p>
              </Col>
            </Row>
            <p className="mt-4" style={{ marginBottom: '0' }}>
              <Link
                className="link"
                to={
                  isAdmin
                    ? `/admin/products/${productId}`
                    : `/products/${productId}`
                }
              >
                Informacion del producto
              </Link>
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

OrderProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default OrderProductCard;
