import React from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddProductSpecificationForm = ({
  specifications,
  productSpecifications,
  addSpecification,
  removeSpecification,
}) => {
  return (
    <>
      <ListGroup className="mb-4">
        {productSpecifications.map((spec) => (
          <ListGroup.Item key={spec.id}>{spec.name}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form.Group controlId="specification">
        <Form.Label>Nombre de especificación</Form.Label>
        <Form.Control as="select">
          {specifications.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="value">
        <Form.Control type="text" placeholder="Valor especificación" />
      </Form.Group>
      <Button className="btn-block btn-secondary">
        Agregar especificación
      </Button>
    </>
  );
};

AddProductSpecificationForm.propTypes = {
  specifications: PropTypes.array.isRequired,
  // addSpecification: PropTypes.func.isRequired,
  // removeSpecification: PropTypes.func.isRequired,
};

export default AddProductSpecificationForm;
