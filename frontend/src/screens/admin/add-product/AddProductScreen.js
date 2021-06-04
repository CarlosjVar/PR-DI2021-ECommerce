import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../../actions/categoryActions';
import { getSpecifications } from '../../../actions/specifcationActions';
import { addProduct } from '../../../actions/productActions';
import uploadImageFile from '../../../utils/uploadImageFile';

import ProductSpecificationManager from '../../../components/products/ProductSpecificationManager';
import Spinner from '../../../components/layout/Spinner';

const AddProductScreen = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    quantity: 0,
    category: undefined,
    specifications: [],
  });

  const [imageUploading, setImageUploading] = useState(false);

  const { categoryList } = useSelector((state) => state.category);

  const { specificationList } = useSelector((state) => state.specification);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSpecifications());
  }, [dispatch]);

  useEffect(() => {
    // Update default category when fetching category list
    if (categoryList.length > 0) {
      setFormData((f) => ({ ...f, category: categoryList[0].id }));
    }
  }, [categoryList]);

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

  const uploadFileHandler = async (e) => {
    try {
      const file = e.target.files[0];
      setImageUploading(true);
      // Upload image file
      const imageFileName = await uploadImageFile(file);
      setFormData({ ...formData, imageFileName });
      setImageUploading(false);
    } catch (error) {
      setImageUploading(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { name, price, quantity, category, specifications, imageFileName } =
      formData;
    dispatch(
      addProduct(
        {
          name,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          category: parseInt(category),
          specifications,
          imageName: imageFileName,
        },
        history
      )
    );
  };

  const { name, price, quantity, category, specifications } = formData;

  return (
    <Row>
      <Col md="6" className="mx-auto">
        <Card>
          <Card.Body>
            <h4 className="text-center mt-3 mb-4">
              <i className="fa fa-plus"></i> Crear producto nuevo
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
                <Form.File
                  onChange={uploadFileHandler}
                  id="image-file"
                  name="imageFileName"
                  label="Imagen"
                />
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
              <Button
                disabled={imageUploading}
                className="btn-block btn-primary mt-4"
                type="submit"
              >
                <i className="fa fa-plus"></i> Crear producto
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddProductScreen;
