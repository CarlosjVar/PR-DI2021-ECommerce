import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { loadCartProducts } from '../../../actions/cartActions';

import Spinner from '../../../components/layout/Spinner';
import ShoppingCartItem from './components/ShoppingCartItem';

const ShoppingCartScreen = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.cart);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.cart) {
      let productIds = JSON.parse(localStorage.getItem('cart'));
      dispatch(loadCartProducts(productIds));
    }
  }, [dispatch]);

  return (
    <Container className="py-4">
      <h2>
        <i className="fas fa-shopping-cart"></i> Carrito
        {isAuthenticated ? ` de ${user.fullName}` : ''}
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <Row className="mt-5">
          <Col md="9">
            {products.map((product) => (
              <ShoppingCartItem key={product.id} productInfo={product} />
            ))}
          </Col>
          <Col md="3"></Col>
        </Row>
      )}
    </Container>
  );
};

export default ShoppingCartScreen;
