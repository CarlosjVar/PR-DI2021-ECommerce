import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { createPreorder } from '../../../../actions/orderActions';

const CreateOrderForm = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [orderType, setOrderType] = useState('preorder');

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.cart);

  const onCreateOrderClick = () => {
    const cartProducts = products.map((product) => ({
      id: product.id,
      numberOfItems: product.numberOfItems,
    }));
    if (orderType === 'preorder') {
      dispatch(createPreorder({ cartProducts }, history));
    } else {
      // TODO: Create sale
    }
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <h5>Tipo de Orden</h5>
        <Form.Group>
          <Form.Control
            name="type"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            as="select"
          >
            <option value="preorder">Preorden</option>
            <option value="sale">Venta</option>
          </Form.Control>
        </Form.Group>
        <Button
          disabled={!isAuthenticated || products.length < 1}
          onClick={onCreateOrderClick}
          className="btn-secondary btn-block"
        >
          Procesar Orden
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CreateOrderForm;
