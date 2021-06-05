import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { loadCartProducts } from '../../../actions/cartActions';

import Spinner from '../../../components/layout/Spinner';

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
        <Row>
          <Col md="8">
            {products.map((product) => (
              <p>{product.name}</p>
            ))}
          </Col>
          <Col md="4"></Col>
        </Row>
      )}
    </Container>
  );
};

export default ShoppingCartScreen;
