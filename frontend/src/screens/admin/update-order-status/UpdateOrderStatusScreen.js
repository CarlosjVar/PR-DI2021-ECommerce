import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import {
  getOrderDetails,
  updateOrderStatus,
} from '../../../actions/orderActions';

import Spinner from '../../../components/layout/Spinner';

const UpdateOrderStatusScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const history = useHistory();

  const [isCancelled, setIsCancelled] = useState('notCancelled');
  const [isDelivered, setIsDelivered] = useState('notDelivered');

  const { orderDetails, loading } = useSelector((state) => state.order);
  const { order } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    setIsDelivered(order.delivered ? 'delivered' : 'notDelivered');
    setIsCancelled(
      order.Sales || order.Preorders.isCancelled ? 'cancelled' : 'notCancelled'
    );
  }, [order]);

  const onDeliveredChange = (deliveredValue) => {
    if (deliveredValue === 'delivered') {
      setIsCancelled('cancelled');
    }
    setIsDelivered(deliveredValue);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const orderStatus = {
      entregado: isDelivered === 'delivered',
      pagado: isCancelled === 'cancelled',
    };
    dispatch(updateOrderStatus(order, orderStatus, history));
  };

  return (
    <Row>
      <Col className="mx-auto" md="6">
        <Card>
          <Card.Body>
            <h3 className="text-center mb-4">
              <i className="fa fa-pen"></i> Editar estado de la orden
            </h3>
            <form onSubmit={onFormSubmit}>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <Form.Group controlId="category">
                    <Form.Label>Estado de pago</Form.Label>
                    <Form.Control
                      onChange={(e) => setIsCancelled(e.target.value)}
                      value={isCancelled}
                      name="isCancelled"
                      as="select"
                      disabled={order.Sales || order.Preorders.isCancelled}
                    >
                      <option value="notCancelled">No ha sido pagado</option>
                      <option value="cancelled">Ha sido pagado</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="category">
                    <Form.Label>Estado de entrega</Form.Label>
                    <Form.Control
                      onChange={(e) => onDeliveredChange(e.target.value)}
                      value={isDelivered}
                      name="isDelivered"
                      as="select"
                      disabled={order.delivered}
                    >
                      <option value="notDelivered">No ha sido entregado</option>
                      <option value="delivered">Ha sido entregado</option>
                    </Form.Control>
                  </Form.Group>

                  <Button
                    disabled={
                      (order.Sales || order.Preorders.isCancelled) &&
                      order.delivered
                    }
                    type="submit"
                    className="btn-primary btn-block"
                  >
                    <i className="fa fa-pen"></i> Editar producto
                  </Button>
                </>
              )}
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateOrderStatusScreen;
