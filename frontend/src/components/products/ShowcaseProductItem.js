import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';

const ShowcaseProductItem = ({ productInfo }) => {
  const { imageFileName, name, price, id } = productInfo;

  return (
    <Card className="my-3 p-4">
      <Link
        className="img-product-link bg-light-grey p-3"
        to={`/products/${id}`}
      >
        <Card.Img src={`/api/utils/image/${imageFileName}`} variant="top" />
      </Link>
      <Card.Body style={{ padding: '0' }}>
        <p className="mt-4">
          <strong>{name}</strong>
        </p>
        <h4 className="mb-3">
          <NumberFormat
            value={price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            isNumericString={true}
            prefix={'₡'}
          />
        </h4>
        <Button className="btn-secondary btn-block">
          <i className="fas fa-cart-plus"></i> Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

ShowcaseProductItem.propTypes = {
  productInfo: PropTypes.object.isRequired,
};

export default ShowcaseProductItem;
