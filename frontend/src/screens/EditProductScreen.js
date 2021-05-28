import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getProductDetails, editProduct } from '../actions/productActions';
import { getCategories } from '../actions/categoryActions';
import { getSpecifications } from '../actions/specifcationActions';

import ProductSpecificationManager from '../components/products/ProductSpecificationManager';
import Spinner from '../components/layout/Spinner';

const EditProductScreen = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { id } = useParams();

  const { productDetails, loading } = useSelector((state) => state.product);

  const { categoryList } = useSelector((state) => state.category);

  const { specificationList } = useSelector((state) => state.specification);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    quantity: 0,
    category: undefined,
    specifications: [],
  });

  useEffect(() => {
    dispatch(getSpecifications());
    dispatch(getCategories());
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    const {
      name,
      imageFileName,
      price,
      quantity,
      categoryId,
      ProductsXSpecifications: productSpecifications,
    } = productDetails;
    // Map product specifications
    let specifications = [];
    if (productSpecifications) {
      specifications = productSpecifications.map((spec) => ({
        id: spec.specificationId,
        value: spec.value,
      }));
    }
    setFormData({
      name,
      imageFileName,
      price: parseInt(price),
      category: categoryId,
      quantity,
      specifications,
    });
  }, [productDetails]);

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle adding specifications
  const addSpecification = (specification) =>
    setFormData({
      ...formData,
      specifications: [...formData.specifications, specification],
    });

  // Handle removing specification
  const removeSpecification = (specificationId) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter(
        (spec) => spec.id !== specificationId
      ),
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { name, price, quantity, category, specifications } = formData;
    dispatch(
      editProduct(
        {
          name,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          category: parseInt(category),
          specifications,
        },
        id,
        history
      )
    );
  };

  if (loading) {
    return <Spinner />;
  }

  const { name, price, quantity, category, specifications } = formData;

  return loading ? (
    <Spinner />
  ) : (
    <Row>
      <Col md="6" className="mx-auto">
        <Card>
          <Card.Body>
            <h4 className="text-center mt-3 mb-4">
              <i className="fa fa-pen"></i> Editar producto
            </h4>
            <form onSubmit={onFormSubmit}>
              {/* Name */}
              <Form.Group controlId="name">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={onInputChange}
                  value={name}
                  placeholder="Nombre"
                />
              </Form.Group>
              {/* Quantity */}
              <Form.Group controlId="quantity">
                <Form.Control
                  type="number"
                  name="quantity"
                  onChange={onInputChange}
                  value={quantity}
                  step="1"
                  min="0"
                  placeholder="Cantidad"
                />
              </Form.Group>
              {/* Price */}
              <Form.Group controlId="price">
                <Form.Control
                  type="number"
                  name="price"
                  onChange={onInputChange}
                  value={price}
                  min="0"
                  placeholder="Precio"
                />
              </Form.Group>
              {/* Category */}
              <Form.Group controlId="category">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  onChange={onInputChange}
                  value={category}
                  name="category"
                  as="select"
                >
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
              {/* Specifications */}
              {specificationList.length < 1 ? (
                <Spinner />
              ) : (
                <ProductSpecificationManager
                  productSpecifications={specifications}
                  addSpecification={addSpecification}
                  removeSpecification={removeSpecification}
                  specifications={specificationList}
                />
              )}
              <Button className="btn-block btn-primary mt-4" type="submit">
                <i className="fa fa-pencil"></i> Editar producto
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditProductScreen;
