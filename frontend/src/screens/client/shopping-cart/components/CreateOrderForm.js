import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const CreateOrderForm = () => {
  return (
    <Card className="mt-3">
      <Card.Body>
        <h5>Tipo de Orden</h5>
        <Form.Group>
          <Form.Control
            name="type"
            onChange={(e) => console.log(e.target.value)}
            as="select"
          >
            <option value="preorder">Preorden</option>
            <option value="sale">Venta</option>
          </Form.Control>
        </Form.Group>
        <Button className="btn-secondary btn-block">Procesar Orden</Button>
      </Card.Body>
    </Card>
  );
};

export default CreateOrderForm;
