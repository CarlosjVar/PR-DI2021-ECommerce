import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { getOrderDetails } from '../../../actions/orderActions';

import OrderProductCard from '../../../components/products/OrderProductCard';
import OrderPriceInfo from './components/OrderPriceInfo';
import Spinner from '../../../components/layout/Spinner';

const AdminOrderDetailsScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { orderDetails, loading } = useSelector((state) => state.order);
  const { client, order, products } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h3>
            Orden de {client && client.name} ({id})
          </h3>
          <Row className="mt-4">
            <Col md="9">
              {order && (
                <>
                  <div
                    className={`alert alert-${
                      order.Sales || order.Preorders.isCancelled
                        ? 'success'
                        : 'danger'
                    }`}
                  >
                    Estado de pago:{' '}
                    {order.Sales || order.Preorders.isCancelled
                      ? 'Ha sido pagado'
                      : 'No ha sido pagado'}
                  </div>
                  <div
                    className={`alert alert-${
                      order.delivered ? 'success' : 'danger'
                    } mb-5`}
                  >
                    Estado de entrega:{' '}
                    {order.delivered
                      ? 'Ha sido entregado'
                      : 'No ha sido entregado'}
                  </div>
                </>
              )}
              {products &&
                products.map((product) => (
                  <OrderProductCard key={product.productId} product={product} />
                ))}
            </Col>
            <Col md="3">
              {order && products && (
                <>
                  <OrderPriceInfo products={products} order={order} />
                  <Link
                    to={`/orders/${order.id}/edit`}
                    className="btn btn-secondary btn-block mt-3"
                  >
                    <i className="fa fa-pen"></i> Editar estado
                  </Link>
                </>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default AdminOrderDetailsScreen;
