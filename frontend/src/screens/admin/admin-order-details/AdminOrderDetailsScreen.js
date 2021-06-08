import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { getOrderDetails } from '../../../actions/orderActions';

import OrderProductCard from '../../../components/products/OrderProductCard';
import Spinner from '../../../components/layout/Spinner';

const AdminOrderDetailsScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // TODO: Obtener nombre y otros detalles
  const { orderDetails, loading } = useSelector((state) => state.order);
  const { client, order, products } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  console.log(client, order, products);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h3>Orden de Test ({id})</h3>
          <Row>
            <Col md="9">
              {products &&
                products.map((product, index) => (
                  <OrderProductCard key={index} product={product} />
                ))}
            </Col>
            <Col md="3"></Col>
          </Row>
        </>
      )}
    </>
  );
};

export default AdminOrderDetailsScreen;
