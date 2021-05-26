import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import { getSpecifications } from '../actions/specifcationActions';

const AddProductScreen = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ name: '', price: 0, quantity: 0 });

  const { categoryList } = useSelector((state) => state.category);

  const { specificationList } = useSelector((state) => state.specification);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSpecifications());
  }, [dispatch]);

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Row>
      <Col md="6" className="mx-auto">
        <Card>
          <Card.Body>
            <h4 className="text-center mt-3 mb-4">
              <i className="fa fa-plus"></i> Crear producto nuevo
            </h4>
            <form>
              {/* Name */}
              <Form.Group controlId="name">
                <Form.Control type="text" placeholder="Nombre" />
              </Form.Group>
              {/* Quantity */}
              <Form.Group controlId="quantity">
                <Form.Control
                  type="number"
                  step="1"
                  min="0"
                  placeholder="Cantidad"
                />
              </Form.Group>
              {/* Price */}
              <Form.Group controlId="price">
                <Form.Control type="number" min="0" placeholder="Precio" />
              </Form.Group>
              {/* Category */}
              <Form.Group controlId="category">
                <Form.Label>Categoría</Form.Label>
                <Form.Control as="select">
                  {categoryList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              {/* Image */}
              <Form.Group>
                <Form.File name="imageFileName" label="Imagen" />
              </Form.Group>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddProductScreen;
