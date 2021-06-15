import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { addProductToCart } from '../../actions/cartActions';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

const ShowcaseProductItem = ({ productInfo }) => {
  const dispatch = useDispatch();

  const { imageFileName, name, price, id, quantity } = productInfo;

  const { products: cartProducts, loading } = useSelector(
    (state) => state.cart
  );

  // Checks if product is in cart
  let productInCart = false;
  for (let product of cartProducts) {
    if (product.id === id) {
      productInCart = true;
    }
  }

  const onAddClick = () => {
    dispatch(addProductToCart(productInfo));
  };

  return (
    <Card className="my-3 p-4">
      <Link
        className="img-product-link bg-light-grey p-3"
        to={`/products/${id}`}
      >
        <Card.Img
          src={
            imageFileName === 'default_img' || !imageFileName
              ? '/img/placeholder-image.jpg'
              : `/api/utils/image/${imageFileName}`
          }
          variant="top"
          fluid="true"
        />
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
        {loading ? (
          <Spinner />
        ) : (
          <Button
            disabled={productInCart || quantity < 1}
            onClick={onAddClick}
            className="btn-secondary btn-block"
          >
            <i className="fas fa-cart-plus"></i> Agregar al carrito
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

ShowcaseProductItem.propTypes = {
  productInfo: PropTypes.object.isRequired,
};

export default ShowcaseProductItem;
