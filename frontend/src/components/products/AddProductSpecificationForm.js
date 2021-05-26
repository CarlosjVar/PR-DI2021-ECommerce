import React, { useEffect, useState } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddProductSpecificationForm = ({
  specifications,
  productSpecifications,
  addSpecification,
  removeSpecification,
}) => {
  const [formData, setFormData] = useState({
    value: '',
    id: specifications[0].id,
    isNumeric: specifications[0].isNumeric,
  });

  useEffect(() => {
    specifications.forEach((spec) => {
      if (spec.id === parseInt(formData.id)) {
        setFormData((f) => ({ ...f, isNumeric: spec.isNumeric }));
      }
    });
  }, [specifications, formData.id]);

  const getSpecificationName = (id) => {
    for (let spec of specifications) {
      if (spec.id === id) {
        return spec.name;
      }
    }
  };

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSpecificationSubmit = () => {
    addSpecification({ value: formData.value, id: parseInt(formData.id) });
  };

  const { value, id, isNumeric } = formData;

  return (
    <>
      <ListGroup className="mb-4">
        {productSpecifications.map((spec) => (
          <ListGroup.Item
            className="spec-form-item"
            onClick={() => removeSpecification(spec.id)}
            key={spec.id}
          >
            {getSpecificationName(spec.id)}: {spec.value}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form.Group controlId="id">
        <Form.Label>Nombre de especificación</Form.Label>
        <Form.Control onChange={onInputChange} name="id" value={id} as="select">
          {specifications.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="value">
        {isNumeric ? (
          <Form.Control
            onChange={onInputChange}
            type="number"
            name="value"
            value={value}
            placeholder="Valor especificación"
          />
        ) : (
          <Form.Control
            onChange={onInputChange}
            type="text"
            name="value"
            value={value}
            placeholder="Valor especificación"
          />
        )}
      </Form.Group>
      <Button
        onClick={onSpecificationSubmit}
        className="btn-block btn-secondary"
      >
        Agregar especificación
      </Button>
    </>
  );
};

AddProductSpecificationForm.propTypes = {
  specifications: PropTypes.array.isRequired,
  addSpecification: PropTypes.func.isRequired,
  removeSpecification: PropTypes.func.isRequired,
};

export default AddProductSpecificationForm;
